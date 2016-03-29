import { Schema, arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import Devshare from 'devshare'
import { isArray } from 'lodash'

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callDevshare (callInfoObj) {
  // console.log('calling devshare:', callInfoObj, Devshare)
  const { model, method, schema } = callInfoObj
  let { modelArgs, methodArgs } = callInfoObj
  // Start call chain
  let devshareCall = Devshare

  // Wrap args in array if not already
  if (!isArray(modelArgs)) modelArgs = [modelArgs]
  if (!isArray(methodArgs)) methodArgs = [methodArgs]

  if (model) {
    // Handle a model with arguments
    devshareCall = modelArgs[0]
      ? devshareCall[model].apply(devshareCall, modelArgs)
      : devshareCall[model]() // Models are all functions
  }

  if (!methodArgs) {
    // console.debug('no method args:', devshareCall[method])
    return devshareCall[method]
      .then(response => schema
        ? Object.assign({}, normalize(camelizeKeys(response), schema))
        : response
      )
  }
  // Make devshare method call with array of params
  return devshareCall[method]
    .apply(this, methodArgs)
    .then(response => schema
      ? Object.assign({}, normalize(camelizeKeys(response), schema))
      : response
    )
}

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

const userSchema = new Schema('users', {
  idAttribute: 'username'
})

function generateProjectSlug (project) {
  return project.owner.username ? `${project.owner.username}/${project.name}` : `anon/${project.name}`
}

const projectSchema = new Schema('projects', {
  idAttribute: generateProjectSlug
})

// Populated by server
// projectSchema.define({
//   owner: userSchema,
//   collaborators: arrayOf(userSchema)
// })

// Schemas for Tessellate API responses
export const Schemas = {
  USER: userSchema,
  USER_ARRAY: arrayOf(userSchema),
  PROJECT: projectSchema,
  PROJECT_ARRAY: arrayOf(projectSchema)
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_DEVSHARE = Symbol('Call Devshare')

// A Redux middleware that interprets actions with CALL_DEVSHARE info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_DEVSHARE]
  if (typeof callAPI === 'undefined') return next(action)

  let { method, methodArgs, model, modelArgs, subModel, subModelArgs } = callAPI
  const { types } = callAPI

  if (typeof method === 'function') method = method(store.getState())

  if (typeof method !== 'string') throw new Error('Specify a method.')

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  function actionWith (data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_DEVSHARE]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))
  const callInfoObj = { method, methodArgs, model, modelArgs, subModel, subModelArgs }
  return callDevshare(callInfoObj).then(
    response => next(actionWith({
      response,
      type: successType
    })), error => next(actionWith({
      type: failureType,
      error: error.message || error || 'Something bad happened'
    }))
  )
}

export { account } from './account'
import u from 'updeep'
import { merge } from 'lodash'
// Updates an entity cache in response to any action with response.entities.
export function entities (state = { users: {}, projects: {} }, action) {
  const { response, method, modelArgs, model } = action
  if (response && response.entities) return merge({}, state, response.entities)
  if (method && modelArgs && model === 'project' && method === 'remove') {
    // if (state.entities && !state.entities[`${model.toLowerCase()}s`]) throw new Error('Entity does not exist')
    const newState = u({ projects: u.omit(`${modelArgs[0]}/${modelArgs[1]}`) }, state)
    return newState
  }
  return state
}

import { merge } from 'lodash'
export { account } from './account'
export { files } from './files'

// Updates an entity cache in response to any action with response.entities.
export function entities (state = { users: {}, projects: {} }, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

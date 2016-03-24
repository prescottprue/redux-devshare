export { account } from './account'
export { projects } from './projects'

// Updates an entity cache in response to any action with response.entities.
export function entities (state = { users: {}, projects: {} }, action) {
  const { response } = action
  if (response && response.entities) return Object.assign({}, state, response.entities)
  return state
}

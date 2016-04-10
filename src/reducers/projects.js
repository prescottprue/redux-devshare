import {
  GET_PROJECTS_REQUEST, GET_PROJECTS_SUCCESS, GET_PROJECTS_FAILURE,
  GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, GET_PROJECT_FAILURE,
  ADD_PROJECT_REQUEST, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE,
  ADD_COLLABORATOR_REQUEST, ADD_COLLABORATOR_SUCCESS, ADD_COLLABORATOR_FAILURE,
  REMOVE_COLLABORATOR_REQUEST, REMOVE_COLLABORATOR_SUCCESS, REMOVE_COLLABORATOR_FAILURE
} from '../actions/account'
import { merge } from 'lodash'

export function projects (state = {
  isFetching: false,
  error: null
}, action) {
  // console.debug('action received:', action, action.error)
  switch (action.type) {
    case GET_PROJECTS_REQUEST:
      return merge(
        {},
        state,
        { isFetching: true, error: null }
      )
    case GET_PROJECTS_SUCCESS:
      return merge(
        {},
        state,
        { isFetching: false, error: null },
        action.response.entities.projects || action.response
      )
    case GET_PROJECTS_FAILURE:
      return merge(
        {},
        state,
        { isFetching: false, error: action.error }
      )
    case GET_PROJECT_REQUEST:
      return merge(
        {},
        state,
        { isFetching: true, error: null }
      )
    case GET_PROJECT_SUCCESS:
      return merge(
        {},
        state,
        action.response.entities.projects || action.response,
        { isFetching: false, error: null }
      )
    case GET_PROJECT_FAILURE:
      return merge(
        {},
        state,
        { isFetching: false, error: action.error }
      )
    case ADD_PROJECT_REQUEST:
      return merge(
        {},
        state,
        { isFetching: true, error: null }
      )
    case ADD_PROJECT_SUCCESS:
      return merge(
        {},
        state,
        action.response,
        { isFetching: false, error: null }
      )
    case ADD_PROJECT_FAILURE:
      return merge(
        {},
        state,
        { isFetching: false, error: action.error }
      )
    case DELETE_PROJECT_REQUEST:
      return merge(
        {},
        state,
        { isFetching: true, error: null }
      )
    case DELETE_PROJECT_SUCCESS:
      return state.filter(project =>
        `${project.owner.username}/${project.name}` !==
        `${action.modelArgs[1]}/${action.modelArgs[0]}`
      )
    case DELETE_PROJECT_FAILURE:
      return merge(
        {},
        state,
        { isFetching: false, error: action.error }
      )
    case UPDATE_PROJECT_REQUEST:
      return merge(
        {},
        state,
        { isFetching: true, error: null }
      )
    case UPDATE_PROJECT_SUCCESS:
      return merge(
        {},
        { isFetching: false, error: null }
      )
    case UPDATE_PROJECT_FAILURE:
      return merge(
        {},
        state,
        { isFetching: false, error: action.error }
      )
    case ADD_COLLABORATOR_REQUEST:
      return merge(
        {},
        state,
        { isFetching: true, error: null }
      )
    case ADD_COLLABORATOR_SUCCESS:
      return merge(
        {},
        { isFetching: false, error: null }
      )
    case ADD_COLLABORATOR_FAILURE:
      return merge(
        {},
        state,
        { isFetching: false, error: action.error }
      )
    case REMOVE_COLLABORATOR_REQUEST:
      return merge(
        {},
        state,
        { isFetching: true, error: null }
      )
    case REMOVE_COLLABORATOR_SUCCESS:
      console.debug('Remove collaborator success:', action)
      const { entities, result } = action.response
      const newState = state.filter(project =>
        `${project.owner.username}/${project.name}` ===
        `${action.modelArgs[0]}/${action.modelArgs[1]}`
      )
      console.debug('newState:', newState)
      return merge(
        {},
        { isFetching: false, error: null },
        newState,
        entities.projects
      )
    case REMOVE_COLLABORATOR_FAILURE:
      return merge(
        {},
        { isFetching: false, error: action.error }
      )
    default:
      return state
  }
}

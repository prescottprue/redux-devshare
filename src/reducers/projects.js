import {
  GET_PROJECTS_REQUEST, GET_PROJECTS_SUCCESS, GET_PROJECTS_FAILURE,
  GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, GET_PROJECT_FAILURE,
  ADD_PROJECT_REQUEST, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS, DELETE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST, UPDATE_PROJECT_SUCCESS, UPDATE_PROJECT_FAILURE
} from '../actions/account'
import { clone } from 'lodash'

export function projects (state = {
  isFetching: false,
  error: null
}, action) {
  switch (action.type) {
    case GET_PROJECTS_REQUEST:
      return clone({},
        state, { isFetching: true, error: null }
      )
    case GET_PROJECTS_SUCCESS:
      return clone({},
        state,
        action.response,
        { isFetching: false, error: null }
      )
    case GET_PROJECTS_FAILURE:
      return clone({},
        state,
        { isFetching: false, error: action.error }
      )
    case GET_PROJECT_REQUEST:
      return clone({},
        state,
        { isFetching: true, error: null }
      )
    case GET_PROJECT_SUCCESS:
      return clone({},
        state,
        action.response,
        { isFetching: false, error: null }
      )
    case GET_PROJECT_FAILURE:
      return clone({},
        state,
        { isFetching: false, error: action.error }
      )
    case ADD_PROJECT_REQUEST:
      return clone({},
        state,
        { isFetching: true, error: null }
      )
    case ADD_PROJECT_SUCCESS:
      return clone({},
        state,
        action.response,
        { isFetching: false, error: null }
      )
    case ADD_PROJECT_FAILURE:
      return clone({},
        state,
        { isFetching: false, error: action.error }
      )
    case DELETE_PROJECT_REQUEST:
      return clone({},
        state,
        { isFetching: true, error: null }
      )
    case DELETE_PROJECT_SUCCESS:
      console.log('project delete success')
      return state.filter(project =>
        `${project.owner.username}/${project.name}` !==
        `${action.modelData[1]}/${action.modelData[0]}`
      )
    case DELETE_PROJECT_FAILURE:
      return clone({},
        state,
        { isFetching: false, error: action.error }
      )
    case UPDATE_PROJECT_REQUEST:
      return clone({},
        state,
        { isFetching: true, error: null }
      )
    case UPDATE_PROJECT_SUCCESS:
      return clone({},
        { isFetching: false, error: null }
      )
    case UPDATE_PROJECT_FAILURE:
      return clone({},
        state,
        { isFetching: false, error: action.error }
      )
    default:
      return state
  }
}

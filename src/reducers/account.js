import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  RECOVER_REQUEST,
  RECOVER_SUCCESS,
  RECOVER_FAILURE
} from '../actions/account'
import { merge } from 'lodash'
export function account (state = {
  isFetching: false,
  error: null
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return merge({}, state, {isFetching: true, error: null})
    case LOGIN_SUCCESS:
      return merge({}, state, {isFetching: false, error: null}, action.response)
    case LOGIN_FAILURE:
      return merge({}, state, {isFetching: false, error: action.error})
    case SIGNUP_REQUEST:
      return merge({}, state, {isFetching: true, error: null})
    case SIGNUP_SUCCESS:
      return merge({}, state, {isFetching: false, error: null}, action.response)
    case SIGNUP_FAILURE:
      return merge({}, state, {isFetching: false, error: action.error})
    case LOGOUT_REQUEST:
      return merge({}, state, {isFetching: true, error: null})
    case LOGOUT_SUCCESS:
      return merge({}, {isFetching: false, error: null})
    case LOGOUT_FAILURE:
      return merge({}, state, {isFetching: false, error: action.error})
    case RECOVER_REQUEST:
      return merge({}, state, {isFetching: true, error: null})
    case RECOVER_SUCCESS:
      return merge({}, {isFetching: false, error: null})
    case RECOVER_FAILURE:
      // console.warn('recover failure', action)
      return merge({}, state, {isFetching: false, error: action.error})
    default:
      return state
  }
}

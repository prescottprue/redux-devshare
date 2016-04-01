import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  RECOVER_REQUEST, RECOVER_SUCCESS, RECOVER_FAILURE,
  PROVIDER_REQUEST, PROVIDER_SUCCESS, PROVIDER_FAILURE
} from '../actions/account'

export function account (state = {
  isFetching: false,
  error: null
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign(
        {},
        state,
        {isFetching: true, error: null}
      )
    case LOGIN_SUCCESS:
      return Object.assign(
        {},
        state,
        {isFetching: false, error: null}, action.response.user
      )
    case LOGIN_FAILURE:
      return Object.assign(
        {},
        state, {isFetching: false, error: action.error}
      )
    case SIGNUP_REQUEST:
      return Object.assign(
        {},
        state,
        {isFetching: true, error: null}
      )
    case SIGNUP_SUCCESS:
      return Object.assign(
        {},
        state,
        {isFetching: false, error: null}, action.response.user
      )
    case SIGNUP_FAILURE:
      return Object.assign(
        {},
        state,
        { isFetching: false, error: action.error }
      )
    case PROVIDER_REQUEST:
      return Object.assign(
        {},
        state,
        {isFetching: true, error: null}
      )
    case PROVIDER_SUCCESS:
      return Object.assign(
        {},
        state,
        { isFetching: false, error: null },
        action.response.user
      )
    case PROVIDER_FAILURE:
      return Object.assign(
        {},
        state,
        { isFetching: false, error: action.error }
      )
    case LOGOUT_REQUEST:
      return Object.assign(
        {},
        state,
        {isFetching: true, error: null}
      )
    case LOGOUT_SUCCESS:
      return Object.assign(
        {},
        { isFetching: false, error: null }
      )
    case LOGOUT_FAILURE:
      return Object.assign(
        {},
        state,
        {isFetching: false, error: action.error}
      )
    case RECOVER_REQUEST:
      return Object.assign(
        {},
        state,
        {isFetching: true, error: null}
      )
    case RECOVER_SUCCESS:
      return Object.assign(
        {},
        {isFetching: false, error: null}
      )
    case RECOVER_FAILURE:
      return Object.assign(
        {},
        state,
        {isFetching: false, error: action.error}
      )
    default:
      return state
  }
}

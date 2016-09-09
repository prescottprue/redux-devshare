import {
    SET_PROFILE,
    LOGIN,
    LOGOUT,
    LOGIN_ERROR,
    AUTHENTICATION_INIT_STARTED,
    AUTHENTICATION_INIT_FINISHED
} from '../constants'

import { Promise } from 'es6-promise'

/**
 * @description Dispatch login error action
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} authError - Error object
 */
const dispatchLoginError = (dispatch, authError) =>
    dispatch({
      type: LOGIN_ERROR,
      authError
    })

/**
 * @description Dispatch login action
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} auth - Auth data object
 */
const dispatchLogin = (dispatch, auth) =>
  dispatch({
    type: LOGIN,
    auth,
    authError: null
  })

/**
 * @description Remove listener from user profile
 * @param {Object} firebase - Internal firebase object
 */
const unWatchUserProfile = (devshare) => {
  const authUid = devshare._.authUid
  const userProfile = devshare._.config.userProfile
  if (devshare._.profileWatch) {
    devshare.firebase.database().ref().child(`${userProfile}/${authUid}`).off('value', devshare._.profileWatch)
    devshare._.profileWatch = null
  }
}

/**
 * @description Watch user profile
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 */
const watchUserProfile = (dispatch, devshare) => {
  const authUid = devshare._.authUid
  const userProfile = devshare._.config.userProfile
  unWatchUserProfile(devshare)
  if (devshare._.config.userProfile) {
    devshare._.profileWatch = devshare.firebase.database()
      .ref()
      .child(`${userProfile}/${authUid}`)
      .on('value', snap => {
        dispatch({
          type: SET_PROFILE,
          profile: snap.val()
        })
      })
  }
}

/**
 * @description Initialize authentication state change listener that
 * watches user profile and dispatches login action
 * @param {Function} dispatch - Action dispatch function
 */
export const init = (dispatch, devshare) => {
  dispatch({ type: AUTHENTICATION_INIT_STARTED })

  devshare.firebase.auth().onAuthStateChanged(authData => {
    if (!authData) {
      return dispatch({ type: LOGOUT })
    }

    devshare._.authUid = authData.uid
    watchUserProfile(dispatch, devshare)

    dispatchLogin(dispatch, authData)
  })
  dispatch({ type: AUTHENTICATION_INIT_FINISHED })

  devshare.firebase.auth().currentUser
}

/**
 * @description Login with errors dispatched
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} credentials - Login credentials
 * @param {Object} credentials.email - Email to login with (only needed for email login)
 * @param {Object} credentials.password - Password to login with (only needed for email login)
 * @param {Object} credentials.provider - Provider name such as google, twitter (only needed for 3rd party provider login)
 * @param {Object} credentials.type - Popup or redirect (only needed for 3rd party provider login)
 * @param {Object} credentials.token - Custom or provider token
 */
export const login = (dispatch, devshare, credentials) => {
  dispatchLoginError(dispatch, null)
  return devshare.login(credentials)
    .catch(err => {
      dispatchLoginError(dispatch, err)
      return Promise.reject(err)
    })
}

/**
 * @description Logout of firebase and dispatch logout event
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @return {Promise}
 */
export const logout = (dispatch, devshare) =>
  devshare.logout()
    .then(() => {
      dispatch({ type: LOGOUT })
      devshare._.authUid = null
      unWatchUserProfile(devshare)
    })

/**
 * @description Create a new user in auth and add an account to userProfile root
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {Object} credentials - Login credentials
 * @return {Promise}
 */
export const signup = (dispatch, devshare, credentials) => {
  dispatchLoginError(dispatch, null)
  return devshare.signup(credentials)
    .catch(err => {
      if (err) {
        switch (err.code) {
          case 'auth/user-not-found':
            dispatchLoginError(dispatch, new Error('The specified user account does not exist.'))
            break
          default:
            dispatchLoginError(dispatch, err)
        }
      }
      return Promise.reject(err)
    })
}

/**
 * @description Send password reset email to provided email
 * @param {Function} dispatch - Action dispatch function
 * @param {Object} firebase - Internal firebase object
 * @param {String} email - Email to send recovery email to
 * @return {Promise}
 */
export const resetPassword = (dispatch, devshare, email) => {
  dispatchLoginError(dispatch, null)
  return devshare.firebase.auth()
    .sendPasswordResetEmail(email)
    .catch((err) => {
      if (err) {
        switch (err.code) {
          case 'INVALID_USER':
            dispatchLoginError(dispatch, new Error('The specified user account does not exist.'))
            break
          default:
            dispatchLoginError(dispatch, err)
        }
        return Promise.reject(err)
      }
    })
}

export default { init, login, signup, logout, resetPassword }

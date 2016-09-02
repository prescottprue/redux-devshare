// import Firebase from 'firebase'
import Devshare, { init } from 'devshare'
import * as Actions from './actions'
import { firebase as fbConfig } from './config'

export default (config) => next => (reducer, initialState) => {
  const defaultConfig = {
    userProfile: '/users',
    usernames: '/usernames'
  }

  const store = next(reducer, initialState)
  const { dispatch } = store

  // Initialize devshare
  init()

  const ref = Devshare.firebase.database().ref()

  // Combine all configs
  const configs = Object.assign({}, defaultConfig, fbConfig, config)

  const devshare = Object.defineProperty(Devshare, '_', {
    value: {
      watchers: {},
      config: configs,
      authUid: null
    },
    writable: true,
    enumerable: true,
    configurable: true
  })

  const set = (path, value, onComplete) =>
    ref.child(path).set(value, onComplete)

  const push = (path, value, onComplete) =>
    ref.child(path).push(value, onComplete)

  const remove = (path, onComplete) =>
    ref.child(path).remove(onComplete)

  const watchEvent = (eventName, eventPath) =>
    Actions.watchEvent(devshare, dispatch, eventName, eventPath, true)

  const unWatchEvent = (eventName, eventPath, queryId = undefined) =>
    Actions.unWatchEvent(devshare, eventName, eventPath, queryId)

  const login = credentials =>
    Actions.login(dispatch, devshare, credentials)

  const logout = () =>
    Actions.logout(dispatch, devshare)

  const createUser = (credentials, profile) =>
    Actions.createUser(dispatch, devshare, credentials, profile)

  const resetPassword = (credentials) =>
    Actions.resetPassword(dispatch, devshare, credentials)

  devshare.helpers = {
    set, push, remove,
    login, logout,
    createUser, resetPassword,
    watchEvent, unWatchEvent
  }

  Actions.init(dispatch, devshare)

  store.devshare = devshare

  return store
}

// import Firebase from 'firebase'
import Devshare, { init } from 'devshare'
import Actions from './actions'

export default (config) => next => (reducer, initialState) => {
  const defaultConfig = {
    userProfile: '/users',
    usernames: '/usernames'
  }

  const store = next(reducer, initialState)
  const { dispatch } = store

  // Initialize devshare
  init(config)

  const ref = Devshare.firebase.database().ref()

  // Combine all configs
  const configs = Object.assign({}, defaultConfig, config)

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

  const update = (path, value, onComplete) =>
    ref.child(path).update(value, onComplete)

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

  const signup = (credentials, profile) =>
    Actions.signup(dispatch, devshare, credentials, profile)

  const resetPassword = (credentials) =>
    Actions.resetPassword(dispatch, devshare, credentials)

  devshare.helpers = {
    set, push, update, remove,
    login, logout, ref,
    signup, resetPassword,
    watchEvent, unWatchEvent,
    storage: () => Devshare.firebase.storage()
  }

  Actions.init(dispatch, devshare)

  store.devshare = devshare

  return store
}

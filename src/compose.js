// import Firebase from 'firebase'
import Devshare, { init } from 'devshare'

let devshareInstance

/**
 * @name reduxDevshare
 * @external
 * @description Middleware that handles configuration (placed in redux's
 * `compose` call)
 * @property {Object} fbConfig - Object containing Firebase config including
 * databaseURL
 * @property {String} fbConfig.apiKey - Firebase apiKey
 * @property {String} fbConfig.authDomain - Firebase auth domain
 * @property {String} fbConfig.databaseURL - Firebase database url
 * @property {String} fbConfig.storageBucket - Firebase storage bucket
 * @property {Object} config - Containing react-redux-firebase specific config
 * such as userProfile
 * @property {String} config.userProfile - Location on firebase to store user
 * profiles
 * @property {Boolean} config.enableLogging - Whether or not to enable Firebase
 * @return {Function} That accepts a component a returns a wrapped version of component
 * @example <caption>Setup</caption>
 * import { createStore, compose } from 'redux'
 * import { reactReduxFirebase } from 'react-redux-firebase'

 * // Redux Devshare Config
 * const config = {
 *   userProfile: 'users', // saves user profiles to '/users' on Firebase
 *   // here is where you place other config options
 * }
 *
 * // Add redux-devshare to compose
 * // Note: In full projects this will often be within createStore.js or store.js
 * const createStoreWithFirebase = compose(
 *  reduxDevshare(fbConfig, config),
 * )(createStore)
 *
 * // Use Function later to create store
 * const store = createStoreWithFirebase(rootReducer, initialState)
 */
export default (config) => next => (reducer, initialState) => {
  const store = next(reducer, initialState)

  // Initialize devshare
  init(config)

  store.devshare = Devshare
  devshareInstance = Devshare

  return store
}

/**
 * @external
 * @description Expose Devshare instance created internally. Useful for
 * integrations into external libraries such as redux-thunk and redux-observable.
 * @example <caption>redux-thunk integration</caption>
 * import { applyMiddleware, compose, createStore } from 'redux';
 * import thunk from 'redux-thunk';
 * import { reactReduxFirebase } from 'react-redux-firebase';
 * import makeRootReducer from './reducers';
 * import { getDevshare } from 'react-redux-firebase';
 *
 * const fbConfig = {} // your firebase config
 *
 * const store = createStore(
 *   makeRootReducer(),
 *   initialState,
 *   compose(
 *     applyMiddleware([
 *       // Pass getDevshare function as extra argument
 *       thunk.withExtraArgument(getDevshare)
 *     ]),
 *     reduxDevshare(fbConfig)
 *   )
 * );
 * // then later
 * export const addTodo = (newTodo) =>
 *  (dispatch, getState, getDevshare) => {
 *    getDevshare()
 *      .push('todos', newTodo)
 *      .then(() => {
 *        dispatch({ type: 'SOME_ACTION' })
 *      })
 * };
 *
 */
export const getDevshare = () => {
  // TODO: Handle recieveing config and creating firebase instance if it doesn't exist
  /* istanbul ignore next: Firebase instance always exists during tests */
  if (!devshareInstance) {
    throw new Error('Devshare instance does not yet exist. Check your compose function.') // eslint-disable-line no-console
  }
  // TODO: Create new firebase here with config passed in
  return devshareInstance
}

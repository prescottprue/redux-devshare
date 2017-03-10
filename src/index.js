import devshare from './connect'
import reduxDevshare, { getDevshare } from './compose'
import reducer from './reducer'
import constants, { actionTypes } from './constants'
import * as helpers from './helpers'

export { devshare, reducer, reduxDevshare, helpers }

export default {
  devshare,
  devshareConnect: devshare,
  reducer,
  reduxDevshare,
  constants,
  actionTypes,
  getDevshare,
  ...helpers
}

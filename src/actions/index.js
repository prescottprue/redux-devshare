import * as auth from './auth'
import * as watch from './watch'
export { auth, watch }
export default Object.assign({}, watch, auth)

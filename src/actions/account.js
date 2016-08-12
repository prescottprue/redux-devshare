import { CALL_DEVSHARE } from '../middleware'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const login = (username, password, project) => (
  {
    [CALL_DEVSHARE]: {
      types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ],
      method: 'login',
      methodArgs: project ? [username, password] : [username, password, project]
    }
  }
)

export const PROVIDER_REQUEST = 'PROVIDER_REQUEST'
export const PROVIDER_SUCCESS = 'PROVIDER_SUCCESS'
export const PROVIDER_FAILURE = 'PROVIDER_FAILURE'

export const authWithProvider = (provider) => (
  {
    [CALL_DEVSHARE]: {
      types: [ PROVIDER_REQUEST, PROVIDER_SUCCESS, PROVIDER_FAILURE ],
      method: 'authWithProvider',
      methodArgs: provider
    }
  }
)

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export const signup = ({username, password}, project) => (
  {
    [CALL_DEVSHARE]: {
      types: [ SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE ],
      method: 'signup',
      methodArgs: project ? [username, password] : [username, password, project]
    }
  }
)

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const logout = () => (
  {
    [CALL_DEVSHARE]: {
      types: [ LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE ],
      method: 'logout'
    }
  }
)

export const RECOVER_REQUEST = 'RECOVER_REQUEST'
export const RECOVER_SUCCESS = 'RECOVER_SUCCESS'
export const RECOVER_FAILURE = 'RECOVER_FAILURE'

export const recover = (recoverData) => (
  {
    [CALL_DEVSHARE]: {
      types: [ RECOVER_REQUEST, RECOVER_SUCCESS, RECOVER_FAILURE ],
      method: 'recoverAccount',
      methodArgs: recoverData
    }
  }
)

export const UPLOAD_AVATAR_REQUEST = 'UPLOAD_AVATAR_REQUEST'
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS'
export const UPLOAD_AVATAR_FAILURE = 'UPLOAD_AVATAR_FAILURE'

export const uploadAvatar = (methodArgs) => (
  {
    [CALL_DEVSHARE]: {
      types: [ UPLOAD_AVATAR_REQUEST, UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_FAILURE ],
      method: 'uploadAvatar',
      methodArgs
    }
  }
)

export const UPDATE_ACCOUNT_REQUEST = 'UPDATE_ACCOUNT_REQUEST'
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS'
export const UPDATE_ACCOUNT_FAILURE = 'UPDATE_ACCOUNT_FAILURE'

export const updateAccount = (methodArgs) => (
  {
    [CALL_DEVSHARE]: {
      types: [ UPDATE_ACCOUNT_REQUEST, UPDATE_ACCOUNT_SUCCESS, UPDATE_ACCOUNT_FAILURE ],
      method: 'updateAccount',
      methodArgs
    }
  }
)

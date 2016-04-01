import { CALL_DEVSHARE } from '../middleware'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function login (username, password) {
  return {
    [CALL_DEVSHARE]: {
      types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ],
      method: 'login',
      methodArgs: [ username, password ]
    }
  }
}

export const PROVIDER_REQUEST = 'PROVIDER_REQUEST'
export const PROVIDER_SUCCESS = 'PROVIDER_SUCCESS'
export const PROVIDER_FAILURE = 'PROVIDER_FAILURE'

export function authWithProvider (provider) {
  return {
    [CALL_DEVSHARE]: {
      types: [ PROVIDER_REQUEST, PROVIDER_SUCCESS, PROVIDER_FAILURE ],
      method: 'authWithProvider',
      methodArgs: provider
    }
  }
}

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'

export function signup (signupData) {
  return {
    [CALL_DEVSHARE]: {
      types: [ SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE ],
      method: 'signup',
      methodArgs: signupData
    }
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export function logout () {
  return {
    [CALL_DEVSHARE]: {
      types: [ LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE ],
      method: 'logout'
    }
  }
}
export const RECOVER_REQUEST = 'RECOVER_REQUEST'
export const RECOVER_SUCCESS = 'RECOVER_SUCCESS'
export const RECOVER_FAILURE = 'RECOVER_FAILURE'

export function recover (recoverData) {
  return {
    [CALL_DEVSHARE]: {
      types: [ RECOVER_REQUEST, RECOVER_SUCCESS, RECOVER_FAILURE ],
      method: 'recoverAccount',
      methodArgs: recoverData
    }
  }
}

export const UPLOAD_AVATAR_REQUEST = 'UPLOAD_AVATAR_REQUEST'
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS'
export const UPLOAD_AVATAR_FAILURE = 'UPLOAD_AVATAR_FAILURE'

export function uploadAvatar (methodArgs) {
  return {
    [CALL_DEVSHARE]: {
      types: [ UPLOAD_AVATAR_REQUEST, UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_FAILURE ],
      method: 'uploadAvatar',
      methodArgs
    }
  }
}

export const UPDATE_ACCOUNT_REQUEST = 'UPDATE_ACCOUNT_REQUEST'
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS'
export const UPDATE_ACCOUNT_FAILURE = 'UPDATE_ACCOUNT_FAILURE'

export function updateAccount (methodArgs) {
  return {
    [CALL_DEVSHARE]: {
      types: [ UPDATE_ACCOUNT_REQUEST, UPDATE_ACCOUNT_SUCCESS, UPDATE_ACCOUNT_FAILURE ],
      method: 'updateAccount',
      methodArgs
    }
  }
}

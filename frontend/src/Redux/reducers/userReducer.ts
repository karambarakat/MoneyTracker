import { ProfileDoc, UserActionTypes, UserState } from './../types'
import { USER_LOGIN, USER_LOGOUT } from '@redux/actions/user'

const initialState: UserState = {
  isOffline: false,
  loggedIn: false,
  profile: undefined,
}

export default function (
  state: UserState = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case USER_LOGIN:
      return {
        profile: action.profile,
        loggedIn: true,
        isOffline: false,
      }
    case USER_LOGOUT:
      return { profile: undefined, loggedIn: false, isOffline: false }
    default:
      return state
  }
}

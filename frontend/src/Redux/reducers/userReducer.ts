import { ProfileDoc, UserState } from './../types'

const initialState: UserState = {
  isOffline: false,
  loggedIn: false,
  profile: undefined,
}

/**
 * actions
 */
export type UserActionTypes =
  | {
      type: 'USER_LOGIN'
      profile: ProfileDoc
    }
  | {
      type: 'USER_LOGOUT'
    }

export default function userReducer(
  state: UserState = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        profile: action.profile,
        loggedIn: true,
        isOffline: false,
      }
    case 'USER_LOGOUT':
      return { profile: undefined, loggedIn: false, isOffline: false }
    default:
      return state
  }
}

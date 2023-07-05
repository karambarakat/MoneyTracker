import invalidStateReducerEnhancer from '@redux/extra/invalidStateReducerEnhancer'
import { Profile } from 'types/src/schema'
import { reducerAction, UserState } from './../types'

const initialState: UserState = {
  onlineState: false,
  profile: undefined,
}

/**
 * actions
 */
export type UserTypes =
  | {
      type: 'USER_ADD_PROFILE'
      pl: {
        profile: Profile
      }
    }
  | {
      type: 'USER_LOGOUT'
    }
  | { type: 'USER_GO_OFFLINE' }
  | { type: 'USER_GO_ONLINE' }

function userReducer(
  state: UserState = initialState,
  action: reducerAction,
): UserState {
  switch (action.type) {
    case 'USER_ADD_PROFILE':
      return {
        profile: action.pl.profile,
        onlineState: true,
      }
    case 'USER_LOGOUT':
      action.fn.clearData()
      return { profile: undefined, onlineState: false }
    case 'USER_GO_OFFLINE':
      return { profile: state.profile, onlineState: false }
    case 'USER_GO_ONLINE':
      return { profile: state.profile, onlineState: true }
    default:
      return state
  }
}

const Invalid = (state: UserState) => !(!state.profile && state.onlineState)

export default invalidStateReducerEnhancer(userReducer, Invalid, initialState)
// export default userReducer

import invalidStateReducerEnhancer from '@redux/extra/invalidStateReducerEnhancer'
import { Middleware } from 'redux'
import { UserDoc } from 'src/types/user'
import { InnerAction, Actions, RootState, UserState } from './../types'

const initialState: UserState = {
  onlineState: false,
  profile: undefined,
}

/**
 * actions
 */
export type UserTypes =
  | {
      type: 'USER_LOGIN'
      pl: {
        profile: UserDoc
      }
    }
  | {
      type: 'USER_LOGOUT'
    }
  | { type: 'USER_GO_OFFLINE' }
  | { type: 'USER_GO_ONLINE' }

function userReducer(
  state: UserState = initialState,
  action: InnerAction
): UserState {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        profile: action.pl.profile,
        onlineState: true,
      }
    case 'USER_LOGOUT':
      action.fns.clearData()
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

import { UserState } from '@interfaces/states'
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_REPLACE,
  USER_WITH_GOOGLE,
} from '@redux/actions/user'

const initialState: UserState = {
  provider: undefined,
  profile: undefined,
  token: undefined,
}

export default function (
  state: UserState = initialState,
  action: any
): UserState {
  switch (action.type) {
    case USER_REPLACE:
      return {
        provider: action.data.provider,
        profile: action.data,
        token: action.data.token,
      }
    case USER_WITH_GOOGLE:
      return {
        provider: 'google',
        profile: action.profile,
        token: action.token,
      }
    case USER_LOGOUT:
      return { provider: undefined, profile: undefined, token: undefined }
    default:
      return state
  }
}

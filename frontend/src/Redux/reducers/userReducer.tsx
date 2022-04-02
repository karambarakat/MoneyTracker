import { FETCH_USER, REGISTER_USER } from '@redux/actions/userTypes'

interface UserState {
  provider: 'google' | 'email' | 'offline' | undefined
  profile:
    | {
        userName: string
        email: string
      }
    | undefined
  token: string | undefined
}

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
    case 'FETCH_USER':
      return {
        ...state,
      }
    case 'REGISTER_USER':
      return {
        ...state,
      }
    case 'LOGOUT':
      return {
        ...state,
      }
    default:
      return state
  }
}

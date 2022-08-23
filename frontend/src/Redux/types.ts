import { USER_LOGIN, USER_LOGOUT } from './actions/user'
import rootReducer from './reducers'

/**
 * states
 */
export interface UserState {
  loggedIn: boolean
  isOffline: boolean
  profile?: ProfileDoc
}

export interface MetaState {
  title: string
}

export interface RootState {
  user: UserState
  meta: MetaState
}

/**
 * actions
 */
export type UserActionTypes =
  | {
      type: typeof USER_LOGIN
      profile: ProfileDoc
    }
  | {
      type: typeof USER_LOGOUT
    }

/**
 * api docs
 */
export interface CategoryDoc {
  _id: string

  title: string
  color?: string
  icon?: string
  createdBy: string

  __v: number
}

export interface LogDoc {
  _id: string

  title: string
  amount: number
  createdBy: string
  category?: {
    _id: string
    title: string
    color: string
  }
  note?: string

  createdAt: string
  updateAt: string
  __v: number
}

export interface ProfileDoc {
  _id: string

  userName: string
  email: string
  googleProfile: undefined | Object
  providers: ('local' | 'google')[]
  picture?: string
  createdAt: string
  updatedAt: string
  __v: number
  token: string
}

export type RestAPI<doc> =
  | {
      error: 'error'
      data: undefined
    }
  | {
      error: null
      data: doc
    }

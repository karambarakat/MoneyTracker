import { CategoriesActionTypes } from './reducers/categoryReducer'
import { LogsActionTypes } from './reducers/logReducer'
import { MetaActionTypes } from './reducers/metaReducer'
import { UserActionTypes } from './reducers/userReducer'

/**
 * states
 */
export interface UserState {
  loggedIn: boolean
  isOffline: boolean
  profile?: ProfileDoc
}

export type LogsState = LogDoc[]

export type CategoriesState = CategoryDoc[]

export interface MetaState {
  title: string
  currency: string
  rating: number
}

export interface RootState {
  user: UserState
  meta: MetaState
  logs: LogsState
  categories: CategoriesState
}

export type MyDispatch = { type: string } & (
  | UserActionTypes
  | LogsActionTypes
  | CategoriesActionTypes
  | MetaActionTypes
)

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
    icon: string
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

export type APIResponse =
  | {
      error: {
        status: number
        message: string
        name: string
        details: any
      }
      data: undefined
    }
  | {
      error: null
      data: any
    }

export type APIResource<doc> = {
  data: doc
}

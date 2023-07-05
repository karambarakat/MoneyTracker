import { Category_out as CatDoc } from 'types/src/schema'
import { Log_out as LogDoc } from 'types/src/schema'
import { Profile } from 'types/src/schema'
import { dispatchSugarFunction, HelpersFns, ReduxFns } from './dispatch'
import { ActionClearAll, ExtraActionsTypes } from './extra/clearData'
import { CategoriesActionTypes as CategoriesTypes } from './reducers/categoryReducer'
import { LogsTypes } from './reducers/logReducer'
import { MetaTypes } from './reducers/metaReducer'
import { UserTypes } from './reducers/userReducer'

/**
 * states
 */
export interface UserState {
  onlineState: boolean
  profile?: Profile
}

export type LogsState = LogDoc[]

export type CategoriesState = CatDoc[]

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

// this is used in dispatch function like `store.dispatch<Actions>(XXXActionTypes)
export type ActionsObjects = {
  type: string /**, pl: *SOMETHING* */
} & (UserTypes | LogsTypes | CategoriesTypes | MetaTypes | ExtraActionsTypes)

// this only used inside reducers
export type reducerAction = ActionsObjects & {
  fn: ActionClearAll // & OtherAction
}

export type dispatchAction = (action: ActionsObjects) => ActionsObjects
export type dispatchSugar = dispatchSugarFunction
export type dispatchFunction = (
  reduxFns: ReduxFns,
  myFns: HelpersFns<any>,
) => Promise<any>

/**
 * api docs
 */
// export interface CategoryDoc {
//   _id: string

//   title: string
//   color?: string
//   icon?: string
//   createdBy: string

//   __v: number
// }

// export interface LogDoc {
//   _id: string

//   title: string
//   amount: number
//   createdBy: string
//   category?: {
//     _id: string
//     title: string
//     color: string
//     icon: string
//   }
//   note?: string

//   createdAt: string
//   updatedAt: string
//   __v: number
// }

// export interface  UserDoc {
//   _id: string

//   displayName: string
//   email: string
//   googleProfile: undefined | Object
//   providers: ('local' | 'google')[]
//   picture?: string
//   createdAt: string
//   updatedAt: string
//   __v: number
//   token: string
// }

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

import { MetaState, UserState } from '@redux/types'

const initialState: MetaState = {
  title: 'Home',
}

/**
 * actions
 */
export type MetaActionTypes =
  | {
      type: 'META_SET_TITLE'
      title: string
    }
  | {
      type: 'META_PING'
    }

export default function metaReducer(
  state: MetaState = initialState,
  action: MetaActionTypes
): MetaState {
  switch (action.type) {
    case 'META_SET_TITLE':
      return {
        ...state,
        title: action.title,
      }
    case 'META_PING':
      console.log('META PING')
      return state
    default:
      return state
  }
}

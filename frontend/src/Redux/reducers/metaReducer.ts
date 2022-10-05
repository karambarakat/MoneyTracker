import { MetaState, UserState } from '@redux/types'

const initialState: MetaState = {
  title: 'Home',
  currency: '$/d',
  rating: 5,
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
      type: 'META_CURRENCY'
      currency: string
    }
  | {
      type: 'META_RATING'
      rating: number
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
    case 'META_CURRENCY':
      return {
        ...state,
        currency: action.currency,
      }
    case 'META_RATING':
      return {
        ...state,
        rating: action.rating,
      }
    default:
      return state
  }
}

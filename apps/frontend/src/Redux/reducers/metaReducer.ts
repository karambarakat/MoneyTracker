import { reducerAction, MetaState, UserState } from '@src/redux/types'

const initialState: MetaState = {
  title: 'Home',
  currency: '$/d',
  rating: 5
}

/**
 * actions
 */
export type MetaTypes =
  | {
      type: 'META_SET_TITLE'
      pl: { title: string }
    }
  | {
      type: 'META_CURRENCY'
      pl: { currency: string }
    }
  | {
      type: 'META_RATING'
      pl: { rating: number }
    }

export default function metaReducer(
  state: MetaState = initialState,
  action: reducerAction
): MetaState {
  switch (action.type) {
    case 'META_SET_TITLE':
      return {
        ...state,
        title: action.pl.title
      }
    case 'META_CURRENCY':
      return {
        ...state,
        currency: action.pl.currency
      }
    case 'META_RATING':
      return {
        ...state,
        rating: action.pl.rating
      }
    default:
      return state
  }
}

import { MetaState, UserState } from '@redux/types'

const initialState: MetaState = {
  title: 'Home',
}

/**
 * actions
 */
export type LogsActionTypes = {
  type: 'META_SET_TITLE'
  title: string
}

export default function metaReducer(
  state: MetaState = initialState,
  action: LogsActionTypes
): MetaState {
  switch (action.type) {
    case 'META_SET_TITLE':
      return {
        ...state,
        title: action.title,
      }
    default:
      return state
  }
}

import { MetaState, UserState } from '@redux/types'
import { META_SET_TITLE } from '@redux/actions/meta'

const initialState: MetaState = {
  title: 'Home',
}

export default function (
  state: MetaState = initialState,
  action: any
): MetaState {
  switch (action.type) {
    case META_SET_TITLE:
      return {
        ...state,
        title: action.title,
      }
    default:
      return state
  }
}

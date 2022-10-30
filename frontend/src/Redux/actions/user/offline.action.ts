import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'user:offline'

export type ActionType = {
  type: typeof type
  return: void

  payload: undefined
}

const action: actionModule<ActionType> = async function (
  _,
  { dispatch, state },
  { pushNoti, online }
) {
  dispatch({ type: 'USER_GO_OFFLINE' })
}

action.type = type
export default action

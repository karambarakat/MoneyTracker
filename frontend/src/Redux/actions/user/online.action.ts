import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'user:online'

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
  alert('Syncing Data Is Not Available Right Now')
}

action.type = type
export default action

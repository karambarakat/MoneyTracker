import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@src/redux/dispatch'

const type = 'user:offline'

export type ActionType = {
  type: typeof type
  return: void

  payload: undefined
}

const action: actionModule<ActionType> = async function (
  _,
  { dispatch, state },
  { pushNoti, online, offline }
) {
  dispatch({ type: 'USER_GO_OFFLINE' })
  pushNoti({
    message: "you're offline now",
    reactions: [
      {
        display: 'go online',
        dispatch: __d(d => d('user:online', {}))
      }
    ]
  })
}

action.type = type
export default action

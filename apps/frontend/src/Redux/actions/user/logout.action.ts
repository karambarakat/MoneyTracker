import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@src/redux/dispatch'
import _dispatch from '../../dispatch'

const type = 'user:logout'

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
  pushNoti({
    message: 'logged out',
    reactions: [
      {
        display: 'login',
        dispatch: __d(d => d('app:navigate', { to: '/auth', asModal: true }))
      }
    ]
  })

  dispatch({
    type: 'USER_LOGOUT'
  })

  _dispatch('app:navigate', { to: '/' })
}

action.type = type
export default action

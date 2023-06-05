import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@src/redux/dispatch'
import { synceData } from 'src/utils/offline'

const type = 'user:online'

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
  dispatch({ type: 'USER_GO_ONLINE' })

  try {
    synceData()
    pushNoti({
      message: 'data has been synced'
    })
  } catch (e) {
    pushNoti({
      message: 'syncing data is not available right now',
      reactions: [
        {
          display: 'sign out',
          style: { color: 'red' },
          dispatch: __d(d => d('user:logout', {}))
        },
        {
          display: 'back data',
          dispatch: __d(d =>
            d('app:navigate', { to: '/export', asModal: true })
          )
        }
      ]
    })
  }
}

action.type = type
export default action

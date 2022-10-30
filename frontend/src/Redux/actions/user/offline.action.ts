import { store } from '@redux/index'
import { Actions } from '@redux/types'
import { httpErrorHandler } from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'user:offline'

export type ActionType = {
  type: typeof type
  return: void

  payload: {}
}

const action: actionModule<ActionType> = async function (
  _,
  { dispatch, state },
  { pushNoti, online }
) {
  dispatch({ type: 'USER_GO_OFFLINE' })

  // },
  // pushNotification: function () {
  //   return store.getState().user.profile
  //     ? {
  //         message: 'New Data Will Not Be Synced Automatically',
  //         react: [{ display: 'Go Online', action: { type: 'user:online' } }],
  //       }
  //     : {
  //         message: "You're Using The App Offline",
  //         react: [{ display: 'LogIn', action: { type: 'user:online' } }],
  //       }
  // },
}

action.type = type
export default action

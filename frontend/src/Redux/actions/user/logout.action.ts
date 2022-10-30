import { store } from '@redux/index'
import { Actions } from '@redux/types'
import { httpErrorHandler } from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'user:logout'

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
  dispatch({
    type: 'USER_LOGOUT',
  })
  // },
  // pushNotification: function () {
  //   return {
  //     message: 'Logged Out',
  //     reactions: [],
  //   }
  // },
}

action.type = type
export default action

import { store } from '@redux/index'
import { Actions } from '@redux/types'
import { httpErrorHandler } from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'user:online'

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
  alert('Syncing Data Is Not Available Right Now')
  // },

  // pushNotification: function () {
  //   return {
  //     message: 'Syncing Data Is Not Available Right Now',
  //     reactions: [],
  //     display: 'failure',
  //   }
  // },
}

action.type = type
export default action

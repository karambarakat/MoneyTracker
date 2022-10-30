import { store } from '@redux/index'
import { Actions } from '@redux/types'
import { UserDoc } from 'src/types/user'
import { httpErrorHandler } from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'user:signup'

export type ActionType = {
  type: typeof type
  return: UserDoc

  payload: {
    userName: string
    email: string
    password: string
  }
}

const action: actionModule<ActionType> = async function (
  values,
  { dispatch, state },
  { pushNoti, online }
) {
  const profile = await online(
    fetch(import.meta.env.VITE_BACKEND_API + '/auth/local/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
  )
  dispatch({
    type: 'USER_LOGIN',
    pl: { profile },
  })
  return profile
  // },
  // offline: async function (argg) {
  //   throw new Error('offline')
  // },
  // pushNotification: function (doc) {
  //   return {
  //     message: 'Account Created, Welcome ' + doc.userName,
  //     reactions: [],
  //   }
  // },
}

action.type = type
export default action

import { store } from '@redux/index'
import { Actions } from '@redux/types'
import { apiProfileUpdate, UserDoc } from 'src/types/user'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'profile:update'

export type ActionType = {
  type: typeof type
  return: UserDoc

  payload: apiProfileUpdate
}

const action: actionModule<ActionType> = async function (
  values,
  { dispatch, state },
  { pushNoti, online }
) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw new Error('no token is available')

  const profile = await online(
    fetch(import.meta.env.VITE_BACKEND_API + '/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ls.profile.token,
      },
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
  //     message: 'Welcome ' + doc.userName,
  //     reactions: [],
  //   }
  // },
}

action.type = type
export default action

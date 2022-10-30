import { store } from '@redux/index'
import { ActionsObjects } from '@redux/types'
import { UserDoc } from 'src/types/user'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'profile:fetch'

export type ActionType = {
  type: typeof type
  return: UserDoc

  payload: {
    token?: string
  }
}

const action: actionModule<ActionType> = async function (
  { token },
  { dispatch, state },
  { pushNoti, online }
) {
  var _token = token
  if (!token) {
    const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')
    if (!ls.profile?.token) throw new Error('no token is available')
    _token = ls.profile.token
  }

  const profile = await online(
    fetch(import.meta.env.VITE_BACKEND_API + '/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + _token,
      },
    })
  )
  dispatch({
    type: 'USER_ADD_PROFILE',
    pl: { profile },
  })

  return profile
}

action.type = type
export default action

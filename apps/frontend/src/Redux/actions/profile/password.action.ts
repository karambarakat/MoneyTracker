import { store } from '@redux/index'
import { ActionsObjects } from '@redux/types'
import {
  apiProfileUpdate_local,
  apiProfileUpdate_nolocal,
  UserDoc,
} from 'types/schema'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'profile:password'

export type ActionType = {
  type: typeof type
  return: UserDoc

  payload: apiProfileUpdate_nolocal | apiProfileUpdate_local
}

const action: actionModule<ActionType> = async function (
  values,
  { dispatch, state },
  { pushNoti, online, offline }
) {
  const profile = await online((helpers) =>
    fetch(import.meta.env.VITE_BACKEND_API + '/profile/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + helpers.token(),
      },
      body: JSON.stringify(values),
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

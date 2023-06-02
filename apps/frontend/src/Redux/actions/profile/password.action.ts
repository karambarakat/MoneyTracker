import { Profile } from 'types/src/schema'
import {
  updatePassword_local,
  updatePassword_nolocal
} from 'types/src/api/routes/profile'
import { actionModule } from '../../dispatch'

const type = 'profile:password'

export type ActionType = {
  type: typeof type
  return: Profile
  payload: updatePassword_nolocal | updatePassword_local
}

const action: actionModule<ActionType> = async function (
  values,
  { dispatch, state },
  { pushNoti, online, offline }
) {
  const profile = await online(helpers =>
    fetch(import.meta.env.VITE_BACKEND_API + '/profile/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + helpers.token()
      },
      body: JSON.stringify(values)
    })
  )
  dispatch({
    type: 'USER_ADD_PROFILE',
    pl: { profile }
  })

  return profile
}

action.type = type
export default action

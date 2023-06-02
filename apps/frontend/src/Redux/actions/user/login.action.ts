import { Profile } from 'types/src/schema'
import { auth_local_login } from 'types/src/api/routes/auth_local'
import { actionModule } from '../../dispatch'

const type = 'user:login'

export type ActionType = {
  type: typeof type
  return: Profile

  payload: auth_local_login
}

const action: actionModule<ActionType> = async function (
  values,
  { dispatch, state },
  { pushNoti, online, offline }
) {
  const profile = await online(helpers =>
    fetch(import.meta.env.VITE_BACKEND_API + '/auth/local/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

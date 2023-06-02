import { apiUserLogin, UserDoc } from 'types'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'user:login'

export type ActionType = {
  type: typeof type
  return: UserDoc

  payload: apiUserLogin
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

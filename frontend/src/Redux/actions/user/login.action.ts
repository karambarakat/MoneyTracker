import { apiUserLogin, UserDoc } from 'src/types/user'
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
  { pushNoti, online }
) {
  const profile = await online(
    fetch(import.meta.env.VITE_BACKEND_API + '/auth/local/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
  )

  pushNoti({ message: `welcome ${profile.userName}` })

  dispatch({
    type: 'USER_LOGIN',
    pl: { profile },
  })

  return profile
}

action.type = type
export default action

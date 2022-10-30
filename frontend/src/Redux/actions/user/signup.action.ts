import { apiUserSignup, UserDoc } from 'src/types/user'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'user:signup'

export type ActionType = {
  type: typeof type
  return: UserDoc

  payload: apiUserSignup
}

const action: actionModule<ActionType> = async function (
  values,
  { dispatch, state },
  { pushNoti, online, offline }
) {
  const profile = await online((helpers) =>
    fetch(import.meta.env.VITE_BACKEND_API + '/auth/local/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
  )

  pushNoti({ message: `user \`${profile.userName}\` was created` })

  dispatch({
    type: 'USER_ADD_PROFILE',
    pl: { profile },
  })

  return profile
}

action.type = type
export default action

import { USER_REGISTER } from '@redux/actions/user'
import { Dispatch } from 'redux'
import throwHttpError from 'src/utils/throwHttpError'
import { loadEnv } from 'vite'
import { store } from '..'

export type UserSignUpArgs = {
  userName: string
  email: string
  password: string
}

export default async function user_signup(values: UserSignUpArgs) {
  const res = await fetch(
    import.meta.env.VITE_BACKEND_API + '/auth/local/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }
  )

  const { error, data } = await res.json()

  error && throwHttpError(error)

  store.dispatch({
    type: USER_REGISTER,
    data,
  })
}

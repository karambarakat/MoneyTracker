import { USER_LOGIN } from '@redux/actions/user'
import { UserActionTypes } from '@redux/types'
import { Dispatch } from 'redux'
import HttpError from 'src/utils/HttpError'
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

  if (error) throw HttpError(error)

  store.dispatch<UserActionTypes>({
    type: USER_LOGIN,
    profile: data,
  })
}

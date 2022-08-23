import { USER_LOGIN } from '@redux/actions/user'
import { UserActionTypes } from '@redux/types'
import { Dispatch } from 'redux'
import HttpError from 'src/utils/HttpError'
import { loadEnv } from 'vite'
import { store } from '../index'

export type UserLoginArgs = {
  email: string
  password: string
}

export default async function user_login(values: UserLoginArgs) {
  const res = await fetch(
    import.meta.env.VITE_BACKEND_API + '/auth/local/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    }
  )
  const { data, error } = await res.json()

  if (error) throw HttpError(error)

  store.dispatch<UserActionTypes>({
    type: USER_LOGIN,
    profile: data,
  })
}

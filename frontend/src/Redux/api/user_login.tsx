import { USER_LOGIN } from '@redux/actions/user'
import { Dispatch } from 'redux'
import throwHttpError from 'src/utils/throwHttpError'
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

  error && throwHttpError(error)

  store.dispatch({
    type: USER_LOGIN,
    data,
  })
}

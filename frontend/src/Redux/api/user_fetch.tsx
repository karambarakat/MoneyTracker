import { USER_LOGIN, USER_REPLACE, USER_UPDATE } from '@redux/actions/user'
import { Dispatch } from 'redux'
import throwHttpError from 'src/utils/throwHttpError'
import { loadEnv } from 'vite'
import { store } from '../index'

export type UserUpdateArgs = {
  userName: string | undefined
  email: string | undefined
  password: string | undefined
}

export default async function user_fetch(
  values: UserUpdateArgs,
  token: string
) {
  const res = await fetch(import.meta.env.VITE_BACKEND_API + '/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
  const { data, error } = await res.json()

  error && throwHttpError(error)

  store.dispatch({
    type: USER_REPLACE,
    data,
  })
}

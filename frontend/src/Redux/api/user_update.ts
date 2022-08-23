import { USER_LOGIN } from '@redux/actions/user'
import { UserActionTypes } from '@redux/types'
import HttpError from 'src/utils/HttpError'
import { store } from '../index'

export type UserUpdateArgs = {
  userName: string | undefined
  email: string | undefined
  password: string | undefined
}

export default async function user_update(
  values: UserUpdateArgs,
  token: string
) {
  const res = await fetch(import.meta.env.VITE_BACKEND_API + '/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(values),
  })
  const { data, error } = await res.json()

  if (error) throw HttpError(error)

  store.dispatch<UserActionTypes>({
    type: USER_LOGIN,
    profile: data,
  })
}

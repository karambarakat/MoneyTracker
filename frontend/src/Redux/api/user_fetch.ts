import { ProfileDoc, RestAPI, UserActionTypes } from '@redux/types'
import { USER_LOGIN } from '@redux/actions/user'
import HttpError from 'src/utils/HttpError'
import { store } from '../index'

export default async function user_fetch(token: string) {
  const res = await fetch(import.meta.env.VITE_BACKEND_API + '/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
  const { data, error } = (await res.json()) as RestAPI<ProfileDoc>

  if (error) throw HttpError(error)

  store.dispatch<UserActionTypes>({
    type: USER_LOGIN,
    profile: data,
  })
}

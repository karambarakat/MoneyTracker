import { USER_LOGIN } from '@redux/actions/user'
import { UserActionTypes } from '@redux/types'
import { Dispatch } from 'redux'
import HttpError from 'src/utils/HttpError'
import { loadEnv } from 'vite'
import { store } from '../index'

export type ProfileUpdateArgs = {
  userName: string
  // picture: string
}

export default async function profile_update(values: ProfileUpdateArgs) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw HttpError({ message: 'Authentication failed' })

  const res = await fetch(import.meta.env.VITE_BACKEND_API + '/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + ls.profile.token,
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

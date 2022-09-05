import { UserActionTypes } from '@redux/reducers/userReducer'
import { MyDispatch, ProfileDoc } from '@redux/types'
import HttpError, { httpErrorHandler } from 'src/utils/HttpError'
import { loadEnv } from 'vite'
import { store } from '../index'

export type ProfilePasswordArgs = {
  oldPassword: string
  newPassword: string
}

export default async function profile_password(values: ProfilePasswordArgs) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw HttpError({ message: 'Authentication failed' })

  const res = await fetch(
    import.meta.env.VITE_BACKEND_API + '/profile/password',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ls.profile.token,
      },
      body: JSON.stringify(values),
    }
  )
  const data: ProfileDoc = await res.json().then(httpErrorHandler)

  store.dispatch<MyDispatch>({
    type: 'USER_LOGIN',
    profile: data,
  })
}

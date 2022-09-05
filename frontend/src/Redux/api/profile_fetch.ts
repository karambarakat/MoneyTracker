import { MyDispatch, ProfileDoc } from '@redux/types'

import { httpErrorHandler } from 'src/utils/HttpError'
import { store } from '../index'

// not used yet
export default async function profile_fetch(token: string) {
  const res = await fetch(import.meta.env.VITE_BACKEND_API + '/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
  const data: ProfileDoc = await res.json().then(httpErrorHandler)

  store.dispatch<MyDispatch>({
    type: 'USER_LOGIN',
    profile: data,
  })
}

import { UserActionTypes } from '@redux/reducers/userReducer'
import { MyDispatch, ProfileDoc } from '@redux/types'

import { Dispatch } from 'redux'
import HttpError, { httpErrorHandler } from 'src/utils/HttpError'
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

  const data: ProfileDoc = await res.json().then(httpErrorHandler)

  store.dispatch<MyDispatch>({
    type: 'USER_LOGIN',
    profile: data,
  })
}

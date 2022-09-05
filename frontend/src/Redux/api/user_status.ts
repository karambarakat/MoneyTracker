import { ProfileDoc } from '@redux/types'

import { httpErrorHandler } from 'src/utils/HttpError'

export type UserStatusArgs = {
  email: string
}

// not used yet
export default async function user_status(values: UserStatusArgs) {
  const res = await fetch(
    import.meta.env.VITE_BACKEND_API + '/profile/status',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }
  )
  const data: ProfileDoc = await res.json().then(httpErrorHandler)

  return data

  //   store.dispatch<MyDispatch>({
  //     type: USER_LOGIN,
  //     profile: data,
  //   })
}

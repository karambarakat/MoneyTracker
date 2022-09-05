import { LogDoc, MyDispatch } from '@redux/types'

import HttpError, { httpErrorHandler } from 'src/utils/HttpError'
import { store } from '../index'

export type FindLogArgs = undefined

// not used yet
export default async function log_find() {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw HttpError({ message: 'Authentication failed' })

  const res = await fetch(import.meta.env.VITE_BACKEND_API + '/log', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + ls.profile.token,
    },
  })
  const data: LogDoc[] = await res.json().then(httpErrorHandler)

  store.dispatch<MyDispatch>({
    type: 'LOG_ADD_ALL',
    logs: data,
  })
}

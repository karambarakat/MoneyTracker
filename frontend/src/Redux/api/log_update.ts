import { LogDoc, MyDispatch } from '@redux/types'

import { Dispatch } from 'redux'
import HttpError, { httpErrorHandler } from 'src/utils/HttpError'
import { loadEnv } from 'vite'
import { store } from '../index'

export type UpdateLogArgs = [
  LogDoc['_id'],
  Omit<LogDoc, 'createdBy' | '__v' | '_id' | 'createdAt' | 'updateAt'>
]

// not used yet
export default async function log_update(
  id: UpdateLogArgs[0],
  log: UpdateLogArgs[1]
) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw HttpError({ message: 'Authentication failed' })

  const res = await fetch(import.meta.env.VITE_BACKEND_API + '/log/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + ls.profile.token,
    },
    body: JSON.stringify(log),
  })

  const data: LogDoc = await res.json().then(httpErrorHandler)

  store.dispatch<MyDispatch>({
    type: 'LOG_UPDATE_ONE',
    log: data,
  })
}

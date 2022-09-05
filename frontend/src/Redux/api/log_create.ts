import { LogDoc, MyDispatch } from '@redux/types'
import HttpError, { httpErrorHandler } from 'src/utils/HttpError'
import { store } from '../index'

export type CreateLogArgs = Omit<
  LogDoc,
  'createdBy' | '__v' | '_id' | 'createdAt' | 'updateAt' | 'category'
> & { category?: string }

// not used yet
export default async function log_create(log: CreateLogArgs) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw HttpError({ message: 'Authentication failed' })

  const res = await fetch(import.meta.env.VITE_BACKEND_API + '/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + ls.profile.token,
    },
    body: JSON.stringify(log),
  })

  const data: LogDoc = await res.json().then(httpErrorHandler)

  store.dispatch<MyDispatch>({
    type: 'LOG_ADD_ONE',
    log: data,
  })
}

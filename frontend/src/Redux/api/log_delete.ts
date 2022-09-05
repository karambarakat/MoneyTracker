import { LogDoc, MyDispatch } from '@redux/types'

import HttpError, { httpErrorHandler } from 'src/utils/HttpError'
import { store } from '../index'

export type DeleteLogArgs = LogDoc['_id']

// not used yet
export default async function log_delete(id: DeleteLogArgs[0]) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw HttpError({ message: 'Authentication failed' })

  const res = await fetch(import.meta.env.VITE_BACKEND_API + '/log/' + id, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + ls.profile.token,
    },
  })

  await res.json().then(httpErrorHandler)

  store.dispatch<MyDispatch>({
    type: 'LOG_DELETE_ONE',
    id: id,
  })
}

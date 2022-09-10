import { CategoryDoc, LogDoc, MyDispatch } from '@redux/types'

import HttpError, { httpErrorHandler } from 'src/utils/HttpError'
import { store } from '../index'

export type FindCategoryArgs = undefined

// not used yet
export default async function category_find() {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw HttpError({ message: 'Authentication failed' })

  const res = await fetch(import.meta.env.VITE_BACKEND_API + '/category', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + ls.profile.token,
    },
  })
  const data: CategoryDoc[] = await res.json().then(httpErrorHandler)

  store.dispatch<MyDispatch>({
    type: 'CATEGORY_ADD_ALL',
    categories: data,
  })
}

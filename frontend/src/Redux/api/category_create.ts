import { CategoryDoc, MyDispatch } from '@redux/types'
import HttpError, { httpErrorHandler } from 'src/utils/HttpError'
import { store } from '../index'

export type CreateCategoryArgs = Omit<CategoryDoc, 'createdBy' | '__v' | '_id'>

// not used yet
export default async function category_create(category: CreateCategoryArgs) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw HttpError({ message: 'Authentication failed' })

  const res = await fetch(import.meta.env.VITE_BACKEND_API + '/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + ls.profile.token,
    },
    body: JSON.stringify(category),
  })

  const data: CategoryDoc = await res.json().then(httpErrorHandler)

  store.dispatch<MyDispatch>({
    type: 'CATEGORY_ADD_ONE',
    category: data,
  })
}

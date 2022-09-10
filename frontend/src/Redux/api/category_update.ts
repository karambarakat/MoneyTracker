import { CategoryDoc, MyDispatch } from '@redux/types'

import { Dispatch } from 'redux'
import HttpError, { httpErrorHandler } from 'src/utils/HttpError'
import { loadEnv } from 'vite'
import { store } from '../index'

export type UpdateCategoryArgs = [
  CategoryDoc['_id'],
  Omit<CategoryDoc, 'createdBy' | '__v' | '_id'>
]

// not used yet
export default async function category_update(
  id: UpdateCategoryArgs[0],
  category: UpdateCategoryArgs[1]
) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw HttpError({ message: 'Authentication failed' })

  const res = await fetch(
    import.meta.env.VITE_BACKEND_API + '/category/' + id,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ls.profile.token,
      },
      body: JSON.stringify(category),
    }
  )

  const data: CategoryDoc = await res.json().then(httpErrorHandler)

  store.dispatch<MyDispatch>({
    type: 'CATEGORY_UPDATE_ONE',
    category: data,
  })
}

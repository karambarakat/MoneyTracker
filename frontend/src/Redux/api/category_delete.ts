import { CategoryDoc, MyDispatch } from '@redux/types'

import HttpError, { httpErrorHandler } from 'src/utils/HttpError'
import { store } from '../index'

export type DeleteCategoryArgs = CategoryDoc['_id']

// not used yet
export default async function category_delete(id: DeleteCategoryArgs[0]) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw HttpError({ message: 'Authentication failed' })

  const res = await fetch(
    import.meta.env.VITE_BACKEND_API + '/category/' + id,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + ls.profile.token,
      },
    }
  )

  await res.json().then(httpErrorHandler)

  store.dispatch<MyDispatch>({
    type: 'CATEGORY_DELETE_ONE',
    id: id,
  })
}

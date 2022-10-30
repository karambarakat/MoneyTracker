import { store } from '@redux/index'
import { Actions } from '@redux/types'
import { CatDoc } from 'src/types/category'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'category:delete'

export type ActionType = {
  type: typeof type
  return: string

  payload: {
    id: CatDoc['_id']
  }
}

const action: actionModule<ActionType> = async function (
  { id },
  { dispatch, state },
  { pushNoti, online }
) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw new Error('no token is available')

  await online(
    fetch(import.meta.env.VITE_BACKEND_API + '/category/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + ls.profile.token,
      },
    })
  )

  // await res.json().then(httpErrorHandler)

  dispatch({
    type: 'CATEGORY_DELETE_ONE',
    pl: { id },
  })

  return id
  // },
  // offline: async function (argg) {
  //   throw new Error('offline')
  // },
  // pushNotification: function (doc) {
  //   return {
  //     message: doc + ' was deleted',
  //     reactions: [],
  //   }
  // },
}

action.type = type
export default action

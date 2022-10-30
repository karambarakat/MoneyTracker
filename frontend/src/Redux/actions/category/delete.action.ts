import { store } from '@redux/index'
import { ActionsObjects } from '@redux/types'
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

  const cat = state().categories.find((c) => c._id === id)

  pushNoti({
    message: `category '${cat?.title}' was deleted`,
    reactions: cat && [
      {
        display: 'restore',
        dispatch: __d((d) => d('cat:undoDelete', { id: cat._id })),
        // style: { color: 'red' },
      },
    ],
  })

  dispatch({
    type: 'CATEGORY_DELETE_ONE',
    pl: { id },
  })

  return id
}

action.type = type
export default action

import { Category as CatDoc } from 'types/src/schema'
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
  { pushNoti, online, offline },
) {
  offline()

  await online(helpers =>
    fetch(import.meta.env.VITE_BACKEND_API + '/category/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + helpers.token(),
      },
    }),
  )

  const cat = state().categories.find(c => c._id === id)

  pushNoti({
    message: `category '${cat?.title}' was deleted`,
    reactions: cat && [
      {
        display: 'restore',
        dispatch: __d(d => d('cat:undoDelete', { id: cat._id })),
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

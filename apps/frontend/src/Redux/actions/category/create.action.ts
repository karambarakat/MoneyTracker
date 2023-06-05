import { Category_out } from 'types/src/schema'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@src/redux/dispatch'
import { category_create } from 'types/src/api/routes/category'

const type = 'category:create'

export type ActionType = {
  type: typeof type
  return: Category_out

  payload: {
    doc: category_create
  }
}

const action: actionModule<ActionType> = async function (
  { doc },
  { dispatch, state },
  { pushNoti, online, offline }
) {
  offline()

  const category = await online(helpers =>
    fetch(import.meta.env.VITE_BACKEND_API + '/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + helpers.token()
      },
      body: JSON.stringify(doc)
    })
  )

  pushNoti({
    message: category.title + ' was added',
    reactions: [
      {
        display: 'delete',
        dispatch: __d(d => d('category:delete', { id: category._id })),
        style: { color: 'red' }
      },
      {
        display: 'edit',
        dispatch: __d(d =>
          d('app:navigate', {
            to: '/editCategory/' + category._id,
            asModal: true
          })
        )
      }
    ]
  })

  dispatch({
    type: 'CATEGORY_ADD_ONE',
    pl: { category }
  })

  return category
}

action.type = type
export default action

import { Category_out, category_in } from 'types/src/schema'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'
import { category_update } from 'types/src/api/routes/category'

const type = 'category:update'

export type ActionType = {
  type: typeof type
  return: Category_out

  payload: {
    id: Category_out['_id']
    doc: category_update
  }
}

const action: actionModule<ActionType> = async function (
  { doc, id },
  { dispatch, state },
  { pushNoti, online, offline },
) {
  offline()

  const category = await online(helpers =>
    fetch(import.meta.env.VITE_BACKEND_API + '/category/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + helpers.token(),
      },
      body: JSON.stringify(doc),
    }),
  )

  const oldDoc = state().categories.find(c => c._id === id)

  pushNoti({
    message: 'category was updated',
    reactions: [
      oldDoc && {
        display: 'undo',
        dispatch: __d(d =>
          d('category:update', {
            doc: {
              color: oldDoc.color,
              icon: oldDoc.icon,
              title: oldDoc.title,
            },
            id,
          }),
        ),
      },
    ],
  })

  dispatch({
    type: 'CATEGORY_UPDATE_ONE',
    pl: { category },
  })

  return category
}

action.type = type
export default action

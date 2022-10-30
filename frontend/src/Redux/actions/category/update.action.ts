import { store } from '@redux/index'
import { ActionsObjects } from '@redux/types'
import { apiCatUpdate, CatDoc } from 'src/types/category'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'category:update'

export type ActionType = {
  type: typeof type
  return: CatDoc

  payload: {
    id: CatDoc['_id']
    doc: apiCatUpdate
  }
}

const action: actionModule<ActionType> = async function (
  { doc, id },
  { dispatch, state },
  { pushNoti, online, offline }
) {
  offline()

  const category = await online((helpers) =>
    fetch(import.meta.env.VITE_BACKEND_API + '/category/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + helpers.token(),
      },
      body: JSON.stringify(doc),
    })
  )

  const oldDoc = state().categories.find((c) => c._id === id)

  pushNoti({
    message: 'category was updated',
    reactions: [
      oldDoc && {
        display: 'undo',
        dispatch: __d((d) =>
          d('category:update', {
            doc: {
              color: oldDoc.color,
              icon: oldDoc.icon,
              title: oldDoc.title,
            },
            id,
          })
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

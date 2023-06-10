import { Category as CatDoc } from 'types/src/schema'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@src/redux/dispatch'

const type = 'category:findOne'

export type ActionType = {
  type: typeof type
  return: CatDoc

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

  const category = await online(helpers =>
    fetch(import.meta.env.VITE_BACKEND_API + '/category/' + id, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + helpers.token,
      },
    }),
  )

  dispatch({
    type: 'CATEGORY_UPDATE_ONE',
    pl: { category },
  })

  return category
}

action.type = type
export default action

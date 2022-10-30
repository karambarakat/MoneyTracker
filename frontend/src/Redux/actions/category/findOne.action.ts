import { store } from '@redux/index'
import { ActionsObjects } from '@redux/types'
import { CatDoc } from 'src/types/category'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

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
  { pushNoti, online, offline }
) {
  offline()

  const category = await online((helpers) =>
    fetch(import.meta.env.VITE_BACKEND_API + '/category/' + id, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + helpers.token,
      },
    })
  )

  dispatch({
    type: 'CATEGORY_UPDATE_ONE',
    pl: { category },
  })

  return category
}

action.type = type
export default action

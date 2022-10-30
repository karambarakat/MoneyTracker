import { store } from '@redux/index'
import { ActionsObjects } from '@redux/types'
import { CatDoc } from 'src/types/category'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'category:find'

export type ActionType = {
  type: typeof type
  return: CatDoc[]

  payload: undefined
}

const action: actionModule<ActionType, CatDoc[]> = async function (
  _,
  { dispatch, state },
  { pushNoti, online, offline }
) {
  offline()

  const categories = await online((helpers) =>
    fetch(import.meta.env.VITE_BACKEND_API + '/category', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + helpers.token(),
      },
    })
  )

  dispatch({
    type: 'CATEGORY_ADD_ALL',
    pl: { categories },
  })

  return categories
}

action.type = type
export default action

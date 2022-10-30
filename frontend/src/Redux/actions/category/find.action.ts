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
  { pushNoti, online }
) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw new Error('no token is available')

  const categories = await online(
    fetch(import.meta.env.VITE_BACKEND_API + '/category', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + ls.profile.token,
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

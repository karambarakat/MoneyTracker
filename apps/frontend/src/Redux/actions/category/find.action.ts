import { Category as CatDoc } from 'types'
import { actionModule } from '../../dispatch'

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

  const categories = await online(helpers =>
    fetch(import.meta.env.VITE_BACKEND_API + '/category', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + helpers.token()
      }
    })
  )

  dispatch({
    type: 'CATEGORY_ADD_ALL',
    pl: { categories }
  })

  return categories
}

action.type = type
export default action

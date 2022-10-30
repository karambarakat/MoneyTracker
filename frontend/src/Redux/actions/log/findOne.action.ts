import { store } from '@redux/index'
import { Actions } from '@redux/types'
import { LogDoc } from 'src/types/log'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'log:findOne'

export type ActionType = {
  type: typeof type
  return: LogDoc

  payload: {
    id: LogDoc['_id']
  }
}

const action: actionModule<ActionType> = async function (
  { id },
  { dispatch, state },
  { pushNoti, online }
) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw new Error('no token is available')

  const log = await online(
    fetch(import.meta.env.VITE_BACKEND_API + '/log/' + id, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + ls.profile.token,
      },
    })
  )

  dispatch({
    type: 'LOG_UPDATE_ONE',
    pl: { log },
  })

  return log
  // },
  // offline: async function (argg) {
  //   throw new Error('offline')
  // },
}

action.type = type
export default action

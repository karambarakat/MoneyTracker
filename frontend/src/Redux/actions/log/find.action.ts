import { store } from '@redux/index'
import { Actions } from '@redux/types'
import { LogDoc } from 'src/types/log'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'log:find'

export type ActionType = {
  type: typeof type
  return: LogDoc[]

  payload: undefined
}

const action: actionModule<ActionType, LogDoc[]> = async function (
  _,
  { dispatch, state },
  { pushNoti, online }
) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw new Error('no token is available')

  const logs = await online(
    fetch(import.meta.env.VITE_BACKEND_API + '/log', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + ls.profile.token,
      },
    })
  )
  dispatch({
    type: 'LOG_ADD_ALL',
    pl: { logs },
  })

  return logs
}

action.type = type
export default action

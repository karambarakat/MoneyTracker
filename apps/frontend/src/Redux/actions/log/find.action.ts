import { store } from '@src/redux/index'
import { ActionsObjects } from '@src/redux/types'
import { Log as LogDoc } from 'types/dist/ts/schema'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@src/redux/dispatch'

const type = 'log:find'

export type ActionType = {
  type: typeof type
  return: LogDoc[]

  payload: undefined
}

const action: actionModule<ActionType, LogDoc[]> = async function (
  _,
  { dispatch, state },
  { pushNoti, online, offline },
) {
  offline()

  const logs = await online(helpers =>
    fetch(import.meta.env.VITE_BACKEND_API + '/log', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + helpers.token(),
      },
    }),
  )
  dispatch({
    type: 'LOG_ADD_ALL',
    pl: { logs },
  })

  return logs
}

action.type = type
export default action

import { store } from '@redux/index'
import { ActionsObjects } from '@redux/types'
import { Log as LogDoc } from 'types/src/schema'
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
  { pushNoti, online, offline },
) {
  offline()

  const log = await online(helpers =>
    fetch(import.meta.env.VITE_BACKEND_API + '/log/' + id, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + helpers.token(),
      },
    }),
  )

  dispatch({
    type: 'LOG_UPDATE_ONE',
    pl: { log },
  })

  return log
}

action.type = type
export default action

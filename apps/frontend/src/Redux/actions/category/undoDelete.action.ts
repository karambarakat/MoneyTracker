import { store } from '@redux/index'
import { ActionsObjects } from '@redux/types'
import { Log as LogDoc } from 'types/src/schema'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'cat:undoDelete'

export type ActionType = {
  type: typeof type
  return: void

  payload: {
    id: LogDoc['_id']
  }
}

const action: actionModule<ActionType> = async function (
  { id },
  { dispatch, state },
  { pushNoti, online, offline }
) {
  pushNoti({
    message: 'this feature is not available for now.',
    display: 'failure'
  })
}

action.type = type
export default action

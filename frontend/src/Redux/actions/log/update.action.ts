import { store } from '@redux/index'
import { Actions } from '@redux/types'
import { LogDoc } from 'src/types/log'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'

const type = 'log:update'

export type ActionType = {
  type: typeof type
  return: LogDoc

  payload: {
    id: LogDoc['_id']
    doc: Omit<
      LogDoc,
      'category' | 'createdBy' | '__v' | '_id' | 'createdAt' | 'updatedAt'
    > & { category?: string }
  }
}

const action: actionModule<ActionType> = async function (
  { doc, id },
  { dispatch, state },
  { pushNoti, online }
) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw new Error('no token is available')

  const log = await online(
    fetch(import.meta.env.VITE_BACKEND_API + '/log/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ls.profile.token,
      },
      body: JSON.stringify(doc),
    })
  )

  pushNoti({
    message: 'log was updated',
    reactions: [
      {
        display: 'undo',
        dispatch: __d((d) => d('log:update', { doc, id })),
      },
    ],
  })

  dispatch({
    type: 'LOG_UPDATE_ONE',
    pl: { log },
  })

  return log
}

action.type = type
export default action

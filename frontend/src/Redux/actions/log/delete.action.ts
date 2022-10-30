import { store } from '@redux/index'
import { ActionsObjects } from '@redux/types'
import { LogDoc } from 'src/types/log'
import HttpError from 'src/utils/HttpError'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@redux/dispatch'
import { Underline } from 'tabler-icons-react'

const type = 'log:delete'

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
  { pushNoti, online }
) {
  const ls = JSON.parse(localStorage.getItem('VITE_REDUX__user') || '{}')

  if (!ls.profile?.token) throw new Error('no token is available')

  await online(
    fetch(import.meta.env.VITE_BACKEND_API + '/log/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + ls.profile.token,
      },
    })
  )

  const log = state().logs.find((log) => log._id === id)

  pushNoti({
    message: `log '${log?.title}' was deleted`,
    reactions: log && [
      {
        display: 'restore',
        dispatch: __d((d) => d('log:undoDelete', { id: log._id })),
        // style: { color: 'red' },
      },
    ],
  })

  dispatch({
    type: 'LOG_DELETE_ONE',
    pl: { id },
  })
}

action.type = type
export default action

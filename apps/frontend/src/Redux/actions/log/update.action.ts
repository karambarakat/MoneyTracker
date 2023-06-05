import { Log_out } from 'types/src/schema'
import { log_update } from 'types/src/api/routes/log'
import { actionModule } from '../../dispatch'
import { dispatchFnToTuple as __d } from '@src/redux/dispatch'

const type = 'log:update'

export type ActionType = {
  type: typeof type
  return: Log_out

  payload: {
    id: Log_out['_id']
    doc: log_update
  }
}

const action: actionModule<ActionType> = async function (
  { doc, id },
  { dispatch, state },
  { pushNoti, online, offline }
) {
  offline()

  const log = await online(helpers =>
    fetch(import.meta.env.VITE_BACKEND_API + '/log/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + helpers.token()
      },
      body: JSON.stringify(doc)
    })
  )

  const oldDoc = state().logs.find(l => l._id === id)

  pushNoti({
    message: 'log was updated',
    reactions: [
      oldDoc && {
        display: 'undo',
        dispatch: __d(d =>
          d('log:update', {
            doc: {
              amount: oldDoc.amount,
              category: oldDoc.category?._id,
              note: oldDoc.note,
              title: oldDoc.title
            },
            id
          })
        )
      }
    ]
  })

  dispatch({
    type: 'LOG_UPDATE_ONE',
    pl: { log }
  })

  return log
}

action.type = type
export default action

import { notification, pushNotification } from '@myHooks/notifications'
import { dispatchFnToTuple as _d } from '@redux/dispatch'
import { dispatchFunction, RootState } from '@redux/types'

import { Middleware } from 'redux'
import HttpError from 'src/utils/HttpError'
import { addOffileData } from 'src/utils/offline'

type typeFn = dispatchFunction

const myThunk: Middleware = (store) => (next) => async (action: typeFn) => {
  if (typeof action === 'function') {
    const notis: notification[] = []

    const n___ = await action(
      { dispatch: store.dispatch, state: store.getState },
      {
        pushNoti: (noti) => {
          notis.push(noti)
          return noti
        },
        online: async (callback) => {
          if ((store.getState() as RootState).user.onlineState === false) {
            try {
              return addOffileData()
            } catch (error) {
              notis.push({
                message: 'failed to add data while offline',
                reactions: [
                  {
                    display: 'go online',
                    dispatch: _d((d) => d('user:online', {})),
                  },
                ],
              })
            }
          }

          const result = await (await callback).json()

          const httpError = new HttpError(result?.error)
          if (httpError.isHttpError) {
            httpError.responses()
            throw httpError
          }

          return result.data
        },
      }
    )

    notis.forEach((noti) => {
      pushNotification(noti)
    })

    return n___
  } else {
    return next(action)
  }
}

const ES = Symbol('error')
class EM extends Error {
  status: number;
  [ES] = true
  constructor(m: any) {
    super(m)
    this.status = 200
  }
}

export default myThunk

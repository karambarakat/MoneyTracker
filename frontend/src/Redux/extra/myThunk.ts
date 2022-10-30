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
    var offline = false

    const n___ = await action(
      { dispatch: store.dispatch, state: store.getState },
      {
        pushNoti: (noti) => {
          notis.push(noti)
          return noti
        },
        offline: () => (offline = true),
        online: async (fetch) => {
          if (
            offline &&
            (store.getState() as RootState).user.onlineState === false
          ) {
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

          const token = () => {
            const token = JSON.parse(
              localStorage.getItem('VITE_REDUX__user') || '{}'
            )?.profile?.token

            if (!token) {
              // offline &&
              //   pushNotification({
              //     message:
              //       "you can't preform this action offline; this feature is not available yet",
              //     reactions: [
              //       {
              //         display: 'log in',
              //         dispatch: _d((d) =>
              //           d('app:navigate', { to: '/auth', asModal: true })
              //         ),
              //       },
              //     ],
              //   })
              throw new Error("you can't preform this action offline")
            }

            return token
          }

          const result = await (await fetch({ token })).json()

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

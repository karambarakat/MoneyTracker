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
    function pushNoti(noti: notification) {
      notis.push(noti)
      return noti
    }

    var offline_ = false
    function offline() {
      offline_ = true
    }

    async function online(
      fetch: (helpers: { token: () => string }) => Promise<Response>
    ) {
      if (
        offline_ &&
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
        const token_ = JSON.parse(
          localStorage.getItem('VITE_REDUX__user') || '{}'
        )?.profile?.token

        if (!token_) {
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
          throw new Error(
            "you can't preform this action offline; this feature is not available yet"
          )
        }

        return token_
      }

      const result = await (await fetch({ token })).json()

      const httpError = new HttpError(result?.error)
      if (httpError.isHttpError) {
        httpError.responses()
        throw httpError
      }

      return result.data
    }

    const return___ = await action(
      { dispatch: store.dispatch, state: store.getState },
      {
        pushNoti,
        offline,
        online,
      }
    )

    notis.forEach((noti) => {
      pushNotification(noti)
    })

    return return___
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

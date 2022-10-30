import { notification, pushNotification } from '@myHooks/notifications'
import dispatch, { HelpersFns, ReduxFns } from '@redux/dispatch'

import { Middleware } from 'redux'
import {
  DefaultError,
  GenericHttpError,
  HttpErrorProps,
} from 'src/types/httpErrors'
import HttpError from 'src/utils/HttpError'

type typeFn = (reduxFns: ReduxFns, myFns: HelpersFns<any>) => Promise<any>

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

import { store } from '@redux/index'
import { APIResponse, Actions } from '@redux/types'
import dispatch from '@redux/dispatch'
import {
  DefaultError,
  GenericHttpError,
  HttpErrorProps,
} from 'src/types/httpErrors'
import { pushNotification } from '@myHooks/notifications'

// export function httpErrorHandler(response: APIResponse) {
//   if (!response.error) return response.data

//   // todo: log out when session ends
//   // need better way to redirect the user to '/'
//   if (response.error?.details?.name == 'TokenExpiredError') {
//     dispatch('user:logout', {})
//   }

//   if (response.error) throw HttpError(response.error)
// }

// export const HttpErrorS = Symbol('HttpError')
// [HttpErrorS] = true

export default class HttpError extends Error {
  isHttpError = false
  info: GenericHttpError = DefaultError

  constructor(payload: Partial<HttpErrorProps> | undefined) {
    super(payload?.message)

    // @ts-ignore
    this.info = payload

    if (
      typeof payload?.message !== 'string' ||
      typeof payload?.status !== 'number' ||
      typeof payload?.name !== 'string'
    ) {
      this.info = DefaultError
      return
    }

    this.isHttpError = true
  }

  responses() {
    switch (this.info.name) {
      case 'SessionEnded':
        dispatch('user:logout', {})
        pushNotification({
          message: this.info.message,
          display: 'failure',
        })
      case 'ResourceWasNotFound':
        pushNotification({ message: 'holla' })
      // case '':
      // case '':
      // case '':
    }
  }

  // function actions{
  //   switch (this.info.name) {
  //     case 'SessionEnded':
  //       dispatch('user:logout', {})
  //       pushNotification({
  //         message: this.info.message,
  //         display: 'failure',
  //       })
  //   }
  // }
}

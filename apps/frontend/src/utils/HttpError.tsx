import dispatch from '@src/redux/dispatch'
import { GenericHttpError, HttpErrorProps } from 'types/src/httpErrors'
import { pushNotification } from '@src/hooks/notifications'

export default class HttpError extends Error {
  isHttpError = false
  info: GenericHttpError = {
    status: 200,
    message: 'generic',
    details: {},
    name: 'error',
  }

  constructor(payload: HttpErrorProps) {
    super(payload?.message)

    this.info = payload

    if (
      typeof payload?.message !== 'string' ||
      typeof payload?.status !== 'number' ||
      typeof payload?.name !== 'string'
    ) {
      this.info = {
        status: 200,
        message: 'generic',
        details: {},
        name: 'error',
      }
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
        break
      case 'ResourceWasNotFound':
        pushNotification({ message: 'holla' })
        break
    }
  }
}

import { MyErrors } from './backend'

export class RestError extends Error {
  status: Payload['status']
  message: Payload['message']
  info: Payload['info']
  code: Payload['code']

  constructor(payload: Payload) {
    super('RestError')

    this.status = payload.status
    this.message = payload.message
    this.info = payload.info
    this.code = payload.code

    if (this.info?.reason) {
      console.error(this.info.reason)
    }
  }

  getFields() {
    return this.info?.fields || {}
  }
}

type MyErrorsOut<T extends MyErrors> = T extends string
  ? T
  : T extends Record<infer K, any>
  ? K
  : never

type MyErrorsKeys = MyErrorsOut<MyErrors>

interface Payload {
  status: number
  message: string
  code: MyErrorsKeys
  info: null | Partial<{
    /* development only info */
    reason: string
    /* files with errors */
    fields: Record<string, string>
  }>
}

export class GraphqlError extends Error {
  errors: Array<object>

  constructor(payload: Array<object>) {
    super('GraphqlError')

    console.log('GraphqlError: ', payload)

    this.errors = payload
  }
}

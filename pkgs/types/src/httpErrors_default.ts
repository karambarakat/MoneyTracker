/** eslint-enable */
import {
  HttpErrors_FieldsRequired,
  HttpErrors_EmailOrPasswordIncorrect,
  HttpErrors_BadBasicToken,
  HttpErrors_PasswordIncorrect,
  HttpErrors_UserAlreadyExist,
  HttpErrors_EmailIsUsed,
  HttpErrors_ResourceWasNotFound,
  HttpErrors_UnknownServerError,
  HttpErrors_ValidationError,
  HttpErrors_FailedToDelete,
  HttpErrors_UnAuthorized,
  HttpErrors_TokenFailed,
  HttpErrors_DefaultError,
} from '../dist/httpErrors'

export type All_Errors =
  | HttpErrors_FieldsRequired
  | HttpErrors_EmailOrPasswordIncorrect
  | HttpErrors_BadBasicToken
  | HttpErrors_PasswordIncorrect
  | HttpErrors_UserAlreadyExist
  | HttpErrors_EmailIsUsed
  | HttpErrors_ResourceWasNotFound
  | HttpErrors_UnknownServerError
  | HttpErrors_ValidationError
  | HttpErrors_FailedToDelete
  | HttpErrors_UnAuthorized
  | HttpErrors_TokenFailed
  | HttpErrors_DefaultError

export type HttpErrorProps = {
  status: number
  name: string
  message: string
  details: object | null
}

export default class HttpError extends Error {
  status: HttpErrorProps['status']
  message: HttpErrorProps['message']
  details: HttpErrorProps['details']
  name: HttpErrorProps['name']
  /**
   * helpful when type narrowing
   */
  payload: All_Errors

  constructor(payload: HttpErrorProps) {
    super('HttpError')

    this.status = payload.status
    this.message = payload.message
    this.details = payload.details
    this.name = payload.name
    this.payload = payload as All_Errors
  }
}

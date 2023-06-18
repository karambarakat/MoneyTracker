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

export type DefaultErrorE =
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

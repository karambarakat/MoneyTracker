import {
  HttpErrors_BadBasicToken,
  HttpErrors_EmailIsUsed,
  HttpErrors_EmailOrPasswordIncorrect,
  HttpErrors_FailedToDelete,
  HttpErrors_SomeFieldsRequired,
  // HttpErrors_PasswordIncorrect,
  // HttpErrors_UnAuthorized,
  // HttpErrors_UnspecifiedError,
  HttpErrors_ResourceWasNotFound,
  HttpErrors_TokenFailed,
  HttpErrors_UnknownServerError,
  HttpErrors_UserAlreadyExist,
  HttpErrors_ValidationError,
} from 'types/dist/ts/http_errors'
import { HttpError } from '.'

export function FieldsRequired(keys: string[]) {
  return new HttpError<HttpErrors_SomeFieldsRequired>({
    status: 400,
    name: 'SomeFieldsRequired',
    message: `these fields are required: ${keys.join(', ')}`,
    details: {
      errors: keys.reduce(
        (acc, key) => {
          acc[key] = `\`${key}\` is required`
          return acc
        },
        {} as Record<string, string>,
      ),
    },
  })
}

export const BadBasicToken = () =>
  new HttpError<HttpErrors_BadBasicToken>({
    status: 401,
    name: 'BadBasicToken',
    message: 'email and password not provided',
    details: null,
  })

export const EmailOrPasswordIncorrect = () =>
  new HttpError<HttpErrors_EmailOrPasswordIncorrect>({
    status: 401,
    name: 'EmailOrPasswordIncorrect',
    message: 'email/password were/was wrong or not provided',
    details: null,
  })

export function UserAlreadyExist() {
  return new HttpError<HttpErrors_UserAlreadyExist>({
    status: 409,
    name: 'UserAlreadyExist',
    message: 'User already exist.',
    details: {
      errors: { email: 'this email is used' },
    },
  })
}

export function EmailIsUsed() {
  return new HttpError<HttpErrors_EmailIsUsed>({
    status: 400,
    name: 'EmailIsUsed',
    message: 'Email is used.',
    details: null,
  })
}

export function ResourceWasNotFound() {
  return new HttpError<HttpErrors_ResourceWasNotFound>({
    status: 404,
    name: 'ResourceWasNotFound',
    message: 'could not find the target',
    details: null,
  })
}

export function UnknownServerError() {
  return new HttpError<HttpErrors_UnknownServerError>({
    status: 500,
    name: 'UnknownServerError',
    message: 'Unknown error occurred in the server.',
    details: null,
  })
}

export function ValidationError(error: {
  msg: string
  errors: Record<string, string>
}) {
  return new HttpError<HttpErrors_ValidationError>({
    status: 400,
    name: 'ValidationError',
    message: error.msg || 'some fields are not valid',
    details: {
      errors: error.errors,
    },
  })
}

// export const QuickValidationError: (
//   fields: Record<string, string>
// ) => ValidationE = (fields) => ({
//   status: 400,
//   name: 'ValidationError',
//   message: 'some fields are not valid',
//   details: {
//     errors: fields,
//   },
// })

// export const ServerError: (message: string) => UnknownServerErrorE = (message) => ({
//   status: 500,
//   name: 'UnknownServerError',
//   message: message || 'Unknown error occurred in the server.',
//   details: null,
// })

export function BadJsonPayload() {
  return new HttpError<HttpErrors_UnknownServerError>({
    status: 500,
    name: 'UnknownServerError',
    message: 'Ops, some error occurred, please try again',
    details: {
      dev: 'JsonSyntaxError: can not parse the json payload',
    },
  })
}

export const PrivateRoute = () =>
  new HttpError<HttpErrors_UnknownServerError>({
    status: 500,
    name: 'UnknownServerError',
    message: 'Ops, some error occurred, please try again',
    details: {
      dev: 'authentication error, private route',
    },
  })

export const NoLog = () =>
  new HttpError<HttpErrors_UnknownServerError>({
    status: 500,
    name: 'UnknownServerError',
    message: 'Ops, some error occurred, please try again',
    details: {
      dev: 'log was not found',
    },
  })

export const NoCategory = () =>
  new HttpError<HttpErrors_UnknownServerError>({
    status: 500,
    name: 'UnknownServerError',
    message: 'Ops, some error occurred, please try again',
    details: {
      dev: 'category was not found',
    },
  })

export const FailedToDelete = () =>
  new HttpError<HttpErrors_FailedToDelete>({
    status: 500,
    name: 'FailedToDelete',
    message: 'failed to delete',
    details: null,
  })

export const TokenFailed: (
  type: HttpErrors_TokenFailed['details']['name'],
  date?: string | null | false,
) => HttpError<HttpErrors_TokenFailed> = (type, date) =>
  new HttpError({
    status: 401,
    name: 'TokenFailed',
    message: 'authorization failed',
    details: {
      ...((date && { date }) || {}),
      name: type,
    },
  })

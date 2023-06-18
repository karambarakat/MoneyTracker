import {
  HttpErrors_BadBasicToken,
  // HttpErrors_BadJsonPayload,
  HttpErrors_EmailIsUsed,
  HttpErrors_EmailOrPasswordIncorrect,
  HttpErrors_FailedToDelete,
  HttpErrors_FieldsRequired,
  HttpErrors_ResourceWasNotFound,
  HttpErrors_TokenFailed,
  // HttpErrors_UnAuthorized,
  HttpErrors_UnknownServerError,
  HttpErrors_UserAlreadyExist,
  HttpErrors_ValidationError,
  // HttpErrors_WrongRouteConfi,
} from 'types/dist/httpErrors'
import { HttpError } from '.'

export function FieldsRequired(keys: string[]) {
  return new HttpError<HttpErrors_FieldsRequired>({
    status: 400,
    name: 'SomeFieldsRequired',
    message: `these fields are required: ${keys.join(', ')}`,
    details: {
      errors: keys.reduce((acc, key) => {
        acc[key] = `\`${key}\` is required`
        return acc
      }, {} as Record<string, string>),
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
    message: 'couldn\'t find the target',
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
    name: 'JsonSyntaxError',
    message: 'can\'t parse the json payload',
    details: null,
  })
}

export const PrivateRoute = () =>
  new HttpError<HttpErrors_UnknownServerError>({
    status: 500,
    name: 'ServerError',
    message: 'authentication error, private route',
    details: null,
  })

export const NoLog = () =>
  new HttpError<HttpErrors_UnknownServerError>({
    status: 500,
    name: 'ServerError',
    message: 'log wasn\'t found',
    details: null,
  })

export const NoCategory = () =>
  new HttpError<HttpErrors_UnknownServerError>({
    status: 500,
    name: 'ServerError',
    message: 'category wasn\'t found',
    details: null,
  })
export const FailedToDelete = () =>
  new HttpError<HttpErrors_FailedToDelete>({
    status: 500,
    name: 'FailedToDelete',
    message: 'failed to delete',
    details: null,
  })

export const TokenFailed: (
  type: HttpErrors_TokenFailed['details']['type'],
  date?: string | null | false,
) => HttpError<HttpErrors_TokenFailed> = (type, date) =>
  new HttpError({
    status: 401,
    name: type,
    message: 'authorization failed',
    details: {
      ...((date && { date }) || {}),
    },
  })

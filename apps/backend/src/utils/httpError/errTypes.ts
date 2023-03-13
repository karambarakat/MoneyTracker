import {
  BadBasicTokenE,
  BadJsonPayloadE,
  EmailIsUsedE,
  EmailOrPasswordIncorrectE,
  FailedToDeleteE,
  FieldsRequiredE,
  ResourceWasNotFoundE,
  TokenFailedE,
  UnAuthorizedE,
  UnknownServerErrorE,
  UserAlreadyExistE,
  ValidationE,
  WrongRouteConfig,
} from 'types/httpErrors'
import { HttpError } from '.'

export function FieldsRequired(keys: string[]) {
  return new HttpError<FieldsRequiredE>({
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
  new HttpError<BadBasicTokenE>({
    status: 401,
    name: 'BadBasicToken',
    message: 'email and password not provided',
    details: null,
  })

export const EmailOrPasswordIncorrect = () =>
  new HttpError<EmailOrPasswordIncorrectE>({
    status: 401,
    name: 'EmailOrPasswordIncorrect',
    message: 'email/password were/was wrong or not provided',
    details: null,
  })

export function UserAlreadyExist() {
  return new HttpError<UserAlreadyExistE>({
    status: 409,
    name: 'UserAlreadyExist',
    message: 'User already exist.',
    details: {
      errors: { email: 'this email is used' },
    },
  })
}

export function EmailIsUsed() {
  return new HttpError<EmailIsUsedE>({
    status: 400,
    name: 'EmailIsUsed',
    message: 'Email is used.',
    details: null,
  })
}

export function ResourceWasNotFound() {
  return new HttpError<ResourceWasNotFoundE>({
    status: 404,
    name: 'ResourceWasNotFound',
    message: 'couldn\'t find the target',
    details: null,
  })
}

export function UnknownServerError() {
  return new HttpError<UnknownServerErrorE>({
    status: 500,
    name: 'UnknownServerError',
    message: 'Unknown error occurred in the server.',
    details: null,
  })
}

export function ValidationError(error: { msg: string, errors: Record<string, string> }) {
  return new HttpError<ValidationE>({
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
  return new HttpError<BadJsonPayloadE>({
    status: 400,
    name: 'JsonSyntaxError',
    message: 'can\'t parse the json payload',
    details: null,
  })
}

export const PrivateRoute = () =>
  new HttpError<WrongRouteConfig>({
    status: 500,
    name: 'ServerError',
    message: 'authentication error, private route',
    details: null,
  })

export const NoLog = () =>
  new HttpError<WrongRouteConfig>({
    status: 500,
    name: 'ServerError',
    message: 'log wasn\'t found',
    details: null,
  })

export const NoCategory = () =>
  new HttpError<WrongRouteConfig>({
    status: 500,
    name: 'ServerError',
    message: 'category wasn\'t found',
    details: null,
  })
export const FailedToDelete = () =>
  new HttpError<FailedToDeleteE>({
    status: 500,
    name: 'ServerError',
    message: 'failed to delete',
    details: null,
  })

export const TokenFailed: (
  type: TokenFailedE['details']['type'],
  date?: string | null | false
) => HttpError<TokenFailedE> = (type, date) =>
    new HttpError({
      status: 401,
      name: type,
      message: 'authorization failed',
      details: {
        ...((date && { date }) || {}),
      },
    })

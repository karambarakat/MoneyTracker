import {
  BadJsonPayloadE,
  EmailIsUsedE,
  EmailOrPasswordIncorrectE,
  FailedToDeleteE,
  FieldsRequiredE,
  PasswordIncorrectE,
  ResourceWasNotFoundE,
  UnAuthorizedE,
  UnknownServerErrorE,
  UserAlreadyExistE,
  ValidationE,
  WrongRouteConfig,
} from 'typesIntegrate/httpErrors'
import { HttpError } from '.'
import { myValidationError } from './errMiddlewares'

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

export const EmailOrPasswordIncorrect = () =>
  new HttpError<EmailOrPasswordIncorrectE>({
    status: 401,
    name: 'EmailOrPasswordIncorrect',
    message: "the email or the password doesn't match our records",
    details: undefined,
  })

export const PasswordIncorrect = () =>
  new HttpError<PasswordIncorrectE>({
    status: 401,
    name: 'PasswordIncorrect',
    message: "the password doesn't match our records",
    details: undefined,
  })

export function UserAlreadyExist() {
  return new HttpError<UserAlreadyExistE>({
    status: 400,
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
    details: undefined,
  })
}

export function ResourceWasNotFound() {
  return new HttpError<ResourceWasNotFoundE>({
    status: 404,
    name: 'ResourceWasNotFound',
    message: "couldn't find the target",
    details: undefined,
  })
}

export function UnknownServerError() {
  return new HttpError<UnknownServerErrorE>({
    status: 500,
    name: 'UnknownServerError',
    message: 'Unknown error occurred in the server.',
    details: undefined,
  })
}

export function ValidationError(error: myValidationError) {
  return new HttpError<ValidationE>({
    status: 400,
    name: 'ValidationError',
    message: error.message || 'some fields are not valid',
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
//   details: undefined,
// })

export function BadJsonPayload() {
  return new HttpError<BadJsonPayloadE>({
    status: 400,
    name: 'JsonSyntaxError',
    message: "can't parse the json payload",
    details: undefined,
  })
}

export const PrivateRoute = () =>
  new HttpError<WrongRouteConfig>({
    status: 500,
    name: 'ServerError',
    message: 'authentication error, private route',
    details: undefined,
  })

export const NoLog = () =>
  new HttpError<WrongRouteConfig>({
    status: 500,
    name: 'ServerError',
    message: "log wasn't found",
    details: undefined,
  })

export const NoCategory = () =>
  new HttpError<WrongRouteConfig>({
    status: 500,
    name: 'ServerError',
    message: "category wasn't found",
    details: undefined,
  })
export const FailedToDelete = () =>
  new HttpError<FailedToDeleteE>({
    status: 500,
    name: 'ServerError',
    message: 'failed to delete',
    details: undefined,
  })

export const UnAuthorized: (i: any) => HttpError<UnAuthorizedE> = (info) =>
  new HttpError({
    status: 401,
    name: 'UnAuthorized',
    message: 'authentication failed',
    details: info,
  })

export const ExpiredToken: (expiredAt: string) => HttpError<UnAuthorizedE> = (
  expiredAt
) =>
  new HttpError({
    status: 401,
    name: 'SessionEnded',
    message: 'session has ended',
    details: { expiredAt },
  })

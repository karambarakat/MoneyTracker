import { CustomHttpErrorProps } from '@interfaces/HTTPError'
import { mongooseValidationError, myValidationError } from 'types/mongoose'

export const EmptyBody: CustomHttpErrorProps = {
  status: 400,
  name: 'HttpErrorMissingFields',
  message: `all fields are missing`,
  details: {},
}

export const EmailOrPasswordIncorrect: CustomHttpErrorProps = {
  status: 401,
  name: 'EmailOrPasswordIncorrect',
  message: "the email or the password doesn't match our records",
  details: {},
}

export const UserAlreadyExist: CustomHttpErrorProps = {
  status: 400,
  name: 'UserAlreadyExist',
  message: 'User already exist.',
  details: {},
}

export const EmailIsUsed: CustomHttpErrorProps = {
  status: 400,
  name: 'EmailIsUsed',
  message: 'Email is used.',
  details: {},
}

export const ResourceWasNotFound: CustomHttpErrorProps = {
  status: 404,
  name: 'ResourceWasNotFound',
  message: "couldn't find the target",
  details: {},
}

export const UnknownServerError: CustomHttpErrorProps = {
  status: 500,
  name: 'UnknownServerError',
  message: 'Unknown error occurred in the server.',
  details: {},
}

export const ValidationError: (
  error: myValidationError
) => CustomHttpErrorProps = (error) => ({
  status: 400,
  name: 'ValidationError',
  message: error.message || 'some fields are not valid',
  details: {
    errors: error.errors,
  },
})

export const QuickValidationError: (fields: {
  [key: string]: string
}) => CustomHttpErrorProps = (fields) => ({
  status: 400,
  name: 'ValidationError',
  message: 'some fields are not valid',
  details: {
    errors: fields,
  },
})

export const ServerError: (message: string) => CustomHttpErrorProps = (
  message
) => ({
  status: 500,
  name: 'UnknownServerError',
  message: message || 'some fields are not valid',
  details: {},
})

export const BadJsonPayload: CustomHttpErrorProps = {
  status: 400,
  name: 'JsonSyntaxError',
  message: "can't parse the json payload",
  details: {},
}

export const PassportUnAuthorized: (
  name: string | undefined,
  info: any
) => CustomHttpErrorProps = (name, info) => ({
  status: 401,
  name: 'UnAuthorized',
  message: name || 'authentication failed',
  details: info,
})

export const PassportNoUser: CustomHttpErrorProps = {
  status: 401,
  name: 'UnAuthorized',
  message: 'user was not found',
  details: {},
}

export const PrivateRoute: CustomHttpErrorProps = {
  status: 500,
  name: 'ServerError',
  message: 'authentication error',
  details: {},
}

export const UnAuthorized = (info: any) => ({
  status: 401,
  name: 'UnAuthorized',
  message: 'authentication failed',
  details: info,
})

import type { HttpErrorProps } from '.'
import { myValidationError } from './errMiddlewares'

export const EmptyBody: HttpErrorProps = {
  status: 400,
  name: 'HttpErrorMissingFields',
  message: `all fields are missing`,
  details: {},
}

export const FieldsRequired: (keys: string[]) => HttpErrorProps = (
  keys: string[]
) => ({
  status: 400,
  name: 'SomeFieldsRequired',
  message: `these fields are required: ${keys.join(', ')}`,
  details: {
    errors: keys.reduce(
      (accumulative: { [key: string]: string }, currentKey: string) => {
        accumulative[currentKey] = `\`${currentKey}\` is required`
        return accumulative
      },
      {}
    ),
  },
})

export const EmailOrPasswordIncorrect: HttpErrorProps = {
  status: 401,
  name: 'EmailOrPasswordIncorrect',
  message: "the email or the password doesn't match our records",
  details: {},
}

export const PasswordIncorrect: HttpErrorProps = {
  status: 401,
  name: 'PasswordIncorrect',
  message: "the password doesn't match our records",
  details: {},
}

export const UserAlreadyExist: HttpErrorProps = {
  status: 400,
  name: 'UserAlreadyExist',
  message: 'User already exist.',
  details: {
    errors: { email: 'this email is used' },
  },
}

export const EmailIsUsed: HttpErrorProps = {
  status: 400,
  name: 'EmailIsUsed',
  message: 'Email is used.',
  details: {},
}

export const ResourceWasNotFound: HttpErrorProps = {
  status: 404,
  name: 'ResourceWasNotFound',
  message: "couldn't find the target",
  details: {},
}

export const UnknownServerError: HttpErrorProps = {
  status: 500,
  name: 'UnknownServerError',
  message: 'Unknown error occurred in the server.',
  details: {},
}

export const ValidationError: (error: myValidationError) => HttpErrorProps = (
  error
) => ({
  status: 400,
  name: 'ValidationError',
  message: error.message || 'some fields are not valid',
  details: {
    errors: error.errors,
  },
})

export const QuickValidationError: (fields: {
  [key: string]: string
}) => HttpErrorProps = (fields) => ({
  status: 400,
  name: 'ValidationError',
  message: 'some fields are not valid',
  details: {
    errors: fields,
  },
})

export const ServerError: (message: string) => HttpErrorProps = (message) => ({
  status: 500,
  name: 'UnknownServerError',
  message: message || 'some fields are not valid',
  details: {},
})

export const BadJsonPayload: HttpErrorProps = {
  status: 400,
  name: 'JsonSyntaxError',
  message: "can't parse the json payload",
  details: {},
}

export const PrivateRoute: HttpErrorProps = {
  status: 500,
  name: 'ServerError',
  message: 'authentication error, private route',
  details: {},
}

export const NoLog: HttpErrorProps = {
  status: 500,
  name: 'ServerError',
  message: "log wasn't found",
  details: {},
}

export const NoCategory: HttpErrorProps = {
  status: 500,
  name: 'ServerError',
  message: "category wasn't found",
  details: {},
}
export const FailedToDelete: HttpErrorProps = {
  status: 500,
  name: 'ServerError',
  message: 'failed to delete',
  details: {},
}

export const UnAuthorized = (info: any) => ({
  status: 401,
  name: 'UnAuthorized',
  message: 'authentication failed',
  details: info,
})

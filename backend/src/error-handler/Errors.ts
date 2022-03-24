import { CustomErrorProps } from '@interfaces/HTTPError'

type misTo = (field: string) => CustomErrorProps
export const HttpErrorMissingFields: misTo = (field: string) => ({
  status: 401,
  name: 'HttpErrorMissingFields',
  message: `${field} field(s) is/are missing`,
  details: {},
})

export const EmailOrPasswordIncorrect: CustomErrorProps = {
  status: 401,
  name: 'EmailOrPasswordIncorrect',
  message: "the email or the password doesn't match our records",
  details: {},
}

export const UserAlreadyExist: CustomErrorProps = {
  status: 400,
  name: 'UserAlreadyExist',
  message: 'User already exist.',
  details: {},
}
export const EmailIsUsed: CustomErrorProps = {
  status: 400,
  name: 'EmailIsUsed',
  message: 'Email is used.',
  details: {},
}

export const ResourceWasNotFound: CustomErrorProps = {
  status: 404,
  name: 'ResourceWasNotFound',
  message: "couldn't find the target",
  details: {},
}

export const UnknownServerError: CustomErrorProps = {
  status: 500,
  name: 'UnknownServerError',
  message: 'Unknown error occurred in the server.',
  details: {},
}

// type fromYup = (error: yupError) => CustomErrorProps
export const ValidationError = (error: any) => ({
  status: 400,
  name: 'ValidationError',
  message: error.message || 'some fields are not valid',
  details: {
    errors: error.errors,
  },
})

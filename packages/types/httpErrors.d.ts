export interface HttpErrorProps {
  status: number
  name: string
  message: string
  details: Record<string, any> | undefined
}
// 

export interface FieldsRequiredE extends HttpErrorProps {
  status: 400
  name: 'SomeFieldsRequired'
  message: string
  details: {
    errors: Record<string, string>
  }
}

export interface EmailOrPasswordIncorrectE extends HttpErrorProps {
  status: 401
  name: 'EmailOrPasswordIncorrect'
  message: string
  details: undefined
}

export interface BadBasicTokenE extends HttpErrorProps {
  status: 401
  name: 'BadBasicToken'
  message: string
  details: undefined
}

export interface PasswordIncorrectE extends HttpErrorProps {
  status: 401
  name: 'PasswordIncorrect'
  message: string
  details: undefined
}
export interface UserAlreadyExistE extends HttpErrorProps {
  status: 409
  name: 'UserAlreadyExist'
  message: string
  details: {
    errors: {
      email: string
    }
  }
}
export interface EmailIsUsedE extends HttpErrorProps {
  status: 400
  name: 'EmailIsUsed'
  message: string
  details: undefined
}

export interface ResourceWasNotFoundE extends HttpErrorProps {
  status: 404
  name: 'ResourceWasNotFound'
  message: string
  details: undefined
}

export interface UnknownServerErrorE extends HttpErrorProps {
  status: 500
  name: 'UnknownServerError'
  message: string
  details: undefined
}

export interface ValidationE extends HttpErrorProps {
  status: 400
  name: 'ValidationError'
  message: string
  details: { errors: Record<string, string> }
}

export interface BadJsonPayloadE extends HttpErrorProps {
  status: 400
  name: 'JsonSyntaxError'
  message: string
  details: undefined
}

export interface WrongRouteConfig extends HttpErrorProps {
  status: 500
  name: 'ServerError'
  message: string
  details: undefined
}

export interface FailedToDeleteE extends HttpErrorProps {
  status: 500
  name: 'ServerError'
  message: string
  details: undefined
}
export interface UnAuthorizedE extends HttpErrorProps {
  status: 401
  name: 'UnAuthorized'
  message: string
  details: any
}

export interface TokenFailedE extends HttpErrorProps {
  status: 401
  name: 'TokenFailed'
  message: string
  details: {
    type:
    | 'JsonWebTokenError'
    | 'TokenExpiredError'
    | 'NoTokenWasProvided'
    | 'UnspecifiedError'
    date?: string
  }
}

export interface DefaultErrorE extends HttpErrorProps {
  status: 500
  name: 'UnspecifiedError'
  message: string
  details: undefined
}

export type GenericHttpError =
  | HttpErrorProps
  | FieldsRequiredE
  | EmailOrPasswordIncorrectE
  | BadBasicTokenE
  | PasswordIncorrectE
  | UserAlreadyExistE
  | EmailIsUsedE
  | ResourceWasNotFoundE
  | UnknownServerErrorE
  | ValidationE
  | BadJsonPayloadE
  | WrongRouteConfig
  | FailedToDeleteE
  | UnAuthorizedE
  | TokenFailedE
  | DefaultErrorE

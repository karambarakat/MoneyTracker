import { NextFunction, Request, Response } from 'express'
import { FieldsRequired } from './errTypes'

export interface HttpErrorProps {
  status: number
  name: string
  message: string
  details: object
}

export interface HttpError extends Error {
  __details: HttpErrorProps
}

export function HTTPErrorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!err.__details) next(err)
  else {
    // if (process.env.NODE_ENV !== 'test') console.error(err)
    res.status(err.__details.status).json({
      data: null,
      error: {
        status: err.__details.status,
        message: err.__details.message,
        name: err.__details.name,
        details: {
          ...err.__details.details,
        },
      },
    })
  }
}

export function requiredFields(object: { [key: string]: any }) {
  if (
    Object.values(object).some((e) => e === null || typeof e === 'undefined')
  ) {
    throw httpError(
      FieldsRequired(
        Object.keys(object).filter((key) => {
          const value = object[key]
          if (value === '' || value === null || typeof value === 'undefined')
            return false

          return true
        })
      )
    )
  }
}

//@ts-ignore
export function httpError(error: HttpErrorProps): Error {
  const CustomError = new Error(error.message) as HttpError
  CustomError.__details = error

  return CustomError
}

export function throwQuickHttpError(
  status: number,
  message: string,
  name?: string,
  details?: any
): void {
  const CustomError = new Error(message)
  const quickError: HttpErrorProps = {
    status,
    message,
    name: name || 'RequestError',
    details: details || {},
  }
  // @ts-ignore
  CustomError.__details = quickError

  throw CustomError
}

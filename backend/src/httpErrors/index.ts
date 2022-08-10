import { CustomError } from 'types/HTTPError'
import { CustomHttpErrorProps } from 'types/HTTPError'

import { NextFunction, Request, Response } from 'express'
import { FieldsRequired } from './errTypes'

export function HTTPErrorHandler(
  err: CustomError,
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
  if (Object.values(object).some((e) => !e)) {
    throwHttpError(
      FieldsRequired(Object.keys(object).filter((key) => !object[key]))
    )
  }
}

export function throwHttpError(error: CustomHttpErrorProps): void {
  const CustomError = new Error(error.message)
  //@ts-ignore
  CustomError.__details = error

  throw CustomError
}

export function returnHttpError(error: CustomHttpErrorProps): Error {
  const CustomError = new Error(error.message)
  //@ts-ignore
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
  const quickError: CustomHttpErrorProps = {
    status,
    message,
    name: name || 'RequestError',
    details: details || {},
  }
  // @ts-ignore
  CustomError.__details = quickError

  throw CustomError
}

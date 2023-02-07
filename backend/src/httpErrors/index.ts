import { NextFunction, Request, Response } from 'express'
import { DefaultError, HttpErrorProps } from '../typesIntegrate/httpErrors'
import { FieldsRequired } from './errTypes'

export const HttpErrorS = Symbol('HttpError')
export class HttpError<Props extends HttpErrorProps> extends Error {
  status: number
  name: string
  details: Record<string, string> | undefined;
  [HttpErrorS] = true

  constructor(args: Props) {
    super(args.message || DefaultError.message)
    this.status = args.status || DefaultError.status
    this.name = args.name || DefaultError.name
    this.details = args.details || DefaultError.details
  }
}

export function HTTPErrorHandler(
  err: HttpError<any> | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!(err instanceof HttpError)) next(err)
  else {
    res.status(err.status).json({
      data: null,
      error: {
        status: err.status,
        message: err.message,
        name: err.name,
        details: {
          ...err.details,
        },
      },
    })
  }
}

export function requiredFields(object: { [key: string]: any }) {
  if (
    Object.values(object).some((e) => e === null || typeof e === 'undefined')
  ) {
    throw FieldsRequired(
      Object.keys(object).filter((key) => {
        const value = object[key]
        if (value === '' || value === null || typeof value === 'undefined')
          return true

        return false
      })
    )
  }
}

export function throwQuickHttpError(
  status: number,
  message: string,
  name?: string,
  details?: any
): void {
  const CustomError = new HttpError({
    message,
    status,
    details,
    name: name || DefaultError.name,
  })

  throw CustomError
}

import { UnknownServerError } from '@error-handler/Errors'
import HttpError from '@error-handler/HttpError'
import { CustomError } from '@interfaces/HTTPError'
import { NextFunction, Request, Response } from 'express'

export default function ValidationErrorHandler400(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === 'ValidationError') {
    // HttpError(ValidationError(err))
    next(err)
  } else {
    next(err)
  }
}

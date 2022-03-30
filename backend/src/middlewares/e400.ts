import { UnknownServerError, ValidationError } from '@error/Errors'
import HttpError from '@error/HttpError'
import { CustomError } from '@interfaces/HTTPError'
import { NextFunction, Request, Response } from 'express'

export default function MongooseValidationError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === 'ValidationError') {
    HttpError(ValidationError(err))
  } else {
    next(err)
  }
}

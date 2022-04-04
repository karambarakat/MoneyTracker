import {
  BadJsonPayload,
  UnknownServerError,
  ValidationError,
} from '@error/Errors'
import HttpError from '@error/HttpError'
import { CustomError } from '@interfaces/HTTPError'
import { NextFunction, Request, Response } from 'express'

export default function handleJsonError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    err.name === 'SyntaxError' &&
    err.message.startsWith('Unexpected string in JSON at position')
  ) {
    HttpError(BadJsonPayload)
  } else {
    next(err)
  }
}

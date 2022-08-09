import {
  UnknownServerError,
  ResourceWasNotFound,
  ValidationError,
  BadJsonPayload,
} from '@httpErrors/errTypes'
import { throwHttpError } from '.'
import { CustomError } from 'types/HTTPError'
import { mongooseValidationError, myValidationError } from 'types/mongoose'
import prepareValidationError from '@utils/prepareValidationError'
import { NextFunction, Request, Response } from 'express'

export function e400_JsonError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    err.name === 'SyntaxError' &&
    err.message.startsWith('Unexpected string in JSON at position')
  ) {
    throwHttpError(BadJsonPayload)
  } else {
    next(err)
  }
}

export function e404_ResourceNotFound() {
  throwHttpError(ResourceWasNotFound)
}

export function e400_MongooseValidation(
  err: mongooseValidationError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === 'ValidationError' && err.errors) {
    //@ts-ignore
    const myErr = prepareValidationError(
      err._message,
      Object.keys(err.errors).reduce((acc: { [key: string]: string }, key) => {
        acc[key] = err.errors[key].message
        return acc
      }, {})
    )
    throwHttpError(ValidationError(myErr))
  } else {
    next(err)
  }
}

export function e500_ServerError(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err)
  res.status(UnknownServerError.status).json({
    status: UnknownServerError.status,
    message: UnknownServerError.message,
    name: UnknownServerError.name,
    details: {},
  })
}

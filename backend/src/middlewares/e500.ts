import { UnknownServerError } from '@error-handler/Errors'
import { CustomError } from '@interfaces/HTTPError'
import NODE_ENV from '@utils/NODE_ENV'
import { NextFunction, Request, Response } from 'express'

export default function ServerError500(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(UnknownServerError.status).json({
    status: UnknownServerError.status,
    message: UnknownServerError.message,
    name: err.name,
    details: {
      ...devDetails(err),
    },
  })
}

function devDetails(err: CustomError) {
  if (NODE_ENV() !== 'development') return null
  return {
    message: err.message,
    cause: err.cause,
    stack: err.stack,
  }
}

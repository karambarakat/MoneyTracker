import { UnknownServerError } from '@error-handler/Errors'
import { CustomError } from '@interfaces/HTTPError'
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
    name: UnknownServerError.name,
    details: {
      ...devDetails(err),
    },
  })
}

function devDetails(err: CustomError) {
  if (process.env.NODE_ENV !== 'development') return null
  return {
    stack: err.stack,
  }
}

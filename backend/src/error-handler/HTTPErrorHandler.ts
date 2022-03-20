import { CustomError } from '@interfaces/HTTPError'
import NODE_ENV from '@utils/NODE_ENV'
import { NextFunction, Request, Response } from 'express'

export default function HTTPErrorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!err.customError) next(err)

  res.status(err.customError.status).json({
    status: err.customError.status,
    message: err.customError.message,
    name: err.customError.name,
    details: {
      ...devDetails(err),
      ...err.customError.details,
    },
  })
}

function devDetails(err: CustomError) {
  if (NODE_ENV() !== 'development') return null
  return {
    stack: err.stack,
  }
}

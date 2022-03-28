import { UnknownServerError } from '@error/Errors'
import { CustomError } from '@interfaces/HTTPError'

import { NextFunction, Request, Response } from 'express'

export default function ServerError500(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err)
  res.status(UnknownServerError.status).json({
    status: UnknownServerError.status,
    message: UnknownServerError.message,
    name: UnknownServerError.message,
    details: {},
  })
}

import { CustomError } from '@interfaces/HTTPError'

import { NextFunction, Request, Response } from 'express'

export default function HTTPErrorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!err.customError) next(err)
  else {
    // if (process.env.NODE_ENV !== 'test') console.error(err)
    res.status(err.customError.status).json({
      data: null,
      error: {
        status: err.customError.status,
        message: err.customError.message,
        name: err.customError.name,
        details: {
          ...err.customError.details,
        },
      },
    })
  }
}

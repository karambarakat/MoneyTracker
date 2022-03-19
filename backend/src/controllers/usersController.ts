import { UserAlreadyExist } from '@error-handler/Errors'
import HttpError from '@error-handler/HttpError'
import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'

const router = Router()

function register(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, userName, email, password } = req.body

  HttpError(UserAlreadyExist)
}

router.route('/').post(_(register))

export default router

import {
  EmailIsUsed,
  EmailOrPasswordIncorrect,
  HttpErrorMissingFields,
  UserAlreadyExist,
} from '@error-handler/Errors'
import HttpError from '@error-handler/HttpError'
import auth from '@middlewares/auth'
import User, { UserInterface } from '@models/User'
import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'

const router = Router()

/**
 *   @desc    get current registered user by their JWT
 *   @route   GET /api/v__/profile
 *   @access  Private
 */
async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  res.json({ data: req.user })
}

/**
 *   @desc    get current registered user by their JWT
 *   @route   POST /api/v__/profile
 *   @access  Private
 */
async function updateCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authUser = req.user as UserInterface
  const { userName, email, password } = req.body

  if (!userName && !email && !password) HttpError(HttpErrorMissingFields('all'))

  const user = await User.findOne({ email })

  if (user && authUser.email !== email) HttpError(EmailIsUsed)

  await User.updateOne(authUser, { userName, email, password })

  res.json({ data: req.user })
}

router.route('/').get(auth, _(getCurrentUser)).put(auth, _(updateCurrentUser))

export default router

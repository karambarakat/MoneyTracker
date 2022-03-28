import { EmailOrPasswordIncorrect, UserAlreadyExist } from '@error/Errors'
import HttpError from '@error/HttpError'
import auth from '@middlewares/auth'
import User from '@models/User'
import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'

const router = Router()

/**
 *   @desc    Register a new user
 *   @route   POST /api/v__/auth/local/register
 *   @access  Public
 */
async function local_register(req: Request, res: Response, next: NextFunction) {
  const { userName, email, password } = req.body

  const user = await User.findOne({ email })

  if (user) HttpError(UserAlreadyExist)

  const newUser = await User.create({ userName, email, password })

  res.status(201).json({ data: newUser.withToken() })
}

/**
 *   @desc    LoginExistingUser
 *   @route   POST /api/v__/auth/local/login
 *   @access  Public
 */
async function local_login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user?.matchPasswords(password)) {
    res.json({ data: user.withToken() })
  } else {
    HttpError(EmailOrPasswordIncorrect)
  }
}

router.route('/local/register').post(_(local_register))
router.route('/local/login').post(_(local_login))

export default router

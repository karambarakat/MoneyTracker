import { db } from '@config/db-conn'
import {
  EmailIsUsed,
  EmailOrPasswordIncorrect,
  HttpErrorMissingFields,
  UserAlreadyExist,
} from '@error-handler/Errors'
import HttpError from '@error-handler/HttpError'
import auth from '@middlewares/auth'
import { UserInterface } from '@models/user/schema'
import * as User from '@models/user/User'
import { ObjectID } from 'bson'
import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'

const router = Router()

async function local_register(req: Request, res: Response, next: NextFunction) {
  const { userName, email, password } = req.body

  const user = await User.findOne({ email })

  if (user) HttpError(UserAlreadyExist)

  const newUser = await User.insertOne({ userName, email, password })

  res.json({ data: newUser.lean() })
}

async function local_login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user?.matchPasswords(password)) {
    res.json({ data: user.lean() })
  } else {
    HttpError(EmailOrPasswordIncorrect)
  }

  // User.matchPasswords(user.password)
}

// async function authenticateUser

async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  res.json({ data: req.user })
}

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

router.route('/local/register').post(_(local_register))
router.route('/local/login').post(_(local_login))
router
  .route('/profile')
  .get(auth, _(getCurrentUser))
  .put(auth, _(updateCurrentUser))

export default router

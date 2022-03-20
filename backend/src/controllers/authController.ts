import { db } from '@config/db-conn'
import {
  EmailOrPasswordIncorrect,
  UserAlreadyExist,
} from '@error-handler/Errors'
import HttpError from '@error-handler/HttpError'
import auth from '@middlewares/auth'
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

router.route('/local/register').post(_(local_register))
router.route('/local/login').post(_(local_login))
router.route('/profile').get(auth, getCurrentUser).put(auth)
// router.route('/login').post(_(authenticateUser))
// router.route('/:userId').get(_(getUser))

export default router

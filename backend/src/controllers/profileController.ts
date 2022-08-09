import {
  EmailIsUsed,
  EmailOrPasswordIncorrect,
  EmptyBody,
  UserAlreadyExist,
} from '@httpErrors/errTypes'
import { throwHttpError } from '@httpErrors'

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
 *   @route   PUT /api/v__/profile
 *   @access  Private
 */
async function updateCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const reqUser = req.user as UserInterface

  const newData = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  }

  if (
    Object.keys(newData).filter(
      (key) =>
        //@ts-ignore
        newData[key]
    ).length === 0
  )
    throwHttpError(EmptyBody)

  const sameEmail = await User.findOne({ email: newData.email })
  if (
    sameEmail &&
    sameEmail._id.toString() !== reqUser?._id.toString() &&
    sameEmail.email === newData.email
  ) {
    throwHttpError(EmailIsUsed)
  }

  await User.updateOne(reqUser, newData, { runValidators: true })

  const newUser = await User.findById(reqUser._id)

  res.json({ data: newUser.withToken() })
}

router.route('/').get(auth, _(getCurrentUser)).put(auth, _(updateCurrentUser))

export default router

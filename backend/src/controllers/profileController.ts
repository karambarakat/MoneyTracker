import {
  EmailIsUsed,
  EmailOrPasswordIncorrect,
  EmptyBody,
  UserAlreadyExist,
} from '@httpErrors/errTypes'
import { throwHttpError } from '@httpErrors'

import auth from '@middlewares/auth'
import User from '@models/User'
import UserInterface from 'types/models/UserModel'

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

// /**
//  *   @desc    receive old and new password and change the password in the database
//  *   @route   POST /api/v__/auth/local/change_password
//  *   @access  Private
//  */
// async function local_change_password(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   if (!req.user) throw PrivateRouteError

//   const { oldPassword, newPassword } = req.body
//   const user = req.user

//   if (!user.provider.some((e: string) => e === 'local') || !user.password) {
//     throw new Error('error resting password')
//   }

//   if (!oldPassword) {
//     throwHttpError(QuickValidationError({ oldPassword: 'this field is empty' }))
//   }

//   if (!newPassword) {
//     throwHttpError(QuickValidationError({ newPassword: 'this field is empty' }))
//   }

//   if (user.matchPasswords(oldPassword)) {
//     user.password = newPassword
//     await user.save()
//     res.json({ data: user.getProfile() })
//   } else {
//     throwHttpError(EmailOrPasswordIncorrect)
//   }
// }

// // router.route('/local/change-password').post(auth, _(local_change_password))
// export { local_change_password }

// /**
//  *   @desc    some users are not registered by email and password (exp: google)
//  *            this route is there to set a new password
//  *   @route   POST /api/v__/auth/local/set_password
//  *   @access  Private
//  */
// async function local_set_password(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   if (!req.user) throw PrivateRouteError

//   const { newPassword } = req.body
//   const user = req.user

//   if (user.provider.some((e: string) => e === 'local') || user.password) {
//     throwHttpError(ServerError('error setting password'))
//   }

//   if (!newPassword) {
//     throwHttpError(QuickValidationError({ newPassword: 'this field is empty' }))
//   }

//   user.password = newPassword
//   user.provider = toggleArrayElement(user.provider, 'local')
//   await user.save()
//   res.json({ data: user.getProfile() })
// }

// // router.route('/local/change-password').post(auth, _(local_set_password))
// export { local_set_password }

// /**
//  *   @desc    receive old and new password and change the password in the database
//  *   @route   GET /api/v__/auth/local/set_password
//  *   @access  Private
//  */
// async function local_info(req: Request, res: Response, next: NextFunction) {
//   const { email } = req.body

//   if (!email) {
//     throwHttpError(QuickValidationError({ email: 'this field is empty' }))
//   }

//   const user = await User.findOne({ email })

//   if (!user) res.send('sign up')
//   else if (user.provider.some((e) => e === 'local') && user.password)
//     res.send('login')
//   else res.send('set password')
// }

// router.route('/local/change-password').post(auth, _(local_set_password))
// export { local_info }

export default router

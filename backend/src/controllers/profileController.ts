import {
  EmailIsUsed,
  EmailOrPasswordIncorrect,
  EmptyBody,
  PasswordIncorrect,
  PrivateRoute,
  UserAlreadyExist,
} from '@httpErrors/errTypes'
import { httpError, requiredFields, throwHttpError } from '@httpErrors'

import auth from '@middlewares/auth'
import User from '@models/User'
import UserInterface from 'types/models/UserModel'

import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'
import {
  email_status,
  profile_update,
  updatePassword_local,
  updatePassword_nolocal,
} from 'types/routes/profile'

const router = Router()

/**
 *   @desc      get current registered user by their JWT
 *   @route     GET /api/v__/profile/status
 *   @body      profile_status
 *   @response  array of all providers for given email,
 *              when empty array the user is not signed up
 *   @access    Public
 */
async function emailProvidersStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body as email_status

  requiredFields({ email })

  const providers = await User.findOne({ email })

  res.json({ data: providers?.providers || [] })
}

/**
 *   @desc    get current registered user by their JWT
 *   @route   GET /api/v__/profile
 *   @access  Private
 */
async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw httpError(PrivateRoute)

  res.json({ data: req.user.withToken() })
}

/**
 *   @desc      get current registered user by their JWT
 *   @route     PUT /api/v__/profile
 *   @body      profile_update
 *   @response  ProfileDoc
 *   @access    Private
 */
async function updateCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) throw httpError(PrivateRoute)

  const { userName, picture } = req.body as profile_update

  req.user.userName = userName || req.user.userName
  req.user.picture = picture || req.user.picture

  await req.user.save()

  res.json({ data: req.user.withToken() })
}

/**
 *   @desc    receive old and new password and change the password in the database
 *   @route   POST /api/v__/auth/local/change_password
 *   @body      updatePassword_local or updatePassword_nolocal
 *   @response  ProfileDoc
 *   @access  Private
 */
async function updatePassword(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw httpError(PrivateRoute)

  if (req.user.providers.includes('local')) {
    const { newPassword, oldPassword } = req.body as updatePassword_local
    requiredFields({ newPassword, oldPassword })

    if (!req.user.matchPasswords(oldPassword))
      throw httpError(PasswordIncorrect)

    req.user.password = newPassword
    await req.user.save()
  } else {
    const { newPassword } = req.body as updatePassword_nolocal
    requiredFields({ newPassword })

    req.user.password = newPassword
    req.user.providers = [...req.user.providers, 'local']
    await req.user.save()
  }

  res.json({ data: req.user.withToken() })
}

router.get('/status', _(emailProvidersStatus))
router.get('/', auth, _(getCurrentUser))
router.put('/', auth, _(updateCurrentUser))
router.put('/password', auth, _(updatePassword))

export default router

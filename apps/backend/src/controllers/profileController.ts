import { EmailOrPasswordIncorrect, PrivateRoute } from '@utils/httpError/errTypes'
import { requiredFieldsMiddleware } from '@utils/httpError'

import bearerAuth from '@middlewares/bearerAuth'
import User from '@models/User'

import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'
import {
  email_status,
  profile_update,
  updatePassword_local,
  updatePassword_nolocal,
} from 'types/api/routes/profile'
import of from '@utils/omitFalsy'

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
  const { email } = of(req.body) as email_status

  requiredFieldsMiddleware({ email })

  const providers = await User.findOne({ email })

  res.json({ data: providers?.providers || [] })
}

/**
 *   @desc    get current registered user by their JWT
 *   @route   GET /api/v__/profile
 *   @access  Private
 */
async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw PrivateRoute()

  res.json({ data: req.user.doc() })
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
  if (!req.user) throw PrivateRoute()

  const { displayName, picture } = of(req.body) as profile_update

  req.user.displayName = displayName || req.user.displayName
  req.user.picture = picture || req.user.picture

  await req.user.save()

  res.json({ data: req.user.doc() })
}

/**
 *   @desc    receive old and new password and change the password in the database
 *   @route   POST /api/v__/auth/local/change_password
 *   @body      updatePassword_local or updatePassword_nolocal
 *   @response  ProfileDoc
 *   @access  Private
 */
async function updatePassword(req: Request, res: Response, next: NextFunction) {
  if (!req.user) throw PrivateRoute()

  if (req.user.providers.includes('local')) {
    const { newPassword, oldPassword } = of(req.body) as updatePassword_local
    requiredFieldsMiddleware({ newPassword, oldPassword })

    if (!req.user.matchPasswords(oldPassword)) throw EmailOrPasswordIncorrect()

    req.user.password = newPassword
    await req.user.save()
  } else {
    const { newPassword } = of(req.body) as updatePassword_nolocal
    requiredFieldsMiddleware({ newPassword })

    req.user.password = newPassword
    req.user.providers = [...req.user.providers, 'local']
    await req.user.save()
  }

  res.json({ data: req.user.doc() })
}

router.get('/status', _(emailProvidersStatus))
router.get('/', bearerAuth, _(getCurrentUser))
router.put('/', bearerAuth, _(updateCurrentUser))
router.put('/password', bearerAuth, _(updatePassword))

export default router

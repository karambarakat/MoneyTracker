import {
  EmailOrPasswordIncorrect,
  QuickValidationError,
  ServerError,
  UserAlreadyExist,
} from '@httpErrors/errTypes'
import { throwHttpError, throwQuickHttpError } from '@httpErrors'
import User from '@models/User'
import { NextFunction, Request, Response } from 'express'
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'
import { jwt_payload } from '@interfaces/jwt'
import truthy from '@utils/truthy'
import { toggleArrayElement } from '@utils/arrayElements'
import PrivateRouteError from '@utils/PrivateRouteError'

const useJWT = new jwtStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async function (payload: jwt_payload, done) {
    try {
      const user = await User.findById(payload.oid)
      user ? done(null, user) : done(null, false)
    } catch (error) {
      done(error, false)
    }
  }
)

//passport.use(useJWT)
export { useJWT }

/**
 *   @desc    Register a new user
 *   @route   POST /api/v__/auth/local/register
 *   @access  Public
 */
async function local_register(req: Request, res: Response, next: NextFunction) {
  const { displayName, email, password, picture } = req.body

  const existUser = await User.findOne({ email })

  if (existUser) throwHttpError(UserAlreadyExist)

  const newUser = await User.create(
    truthy({
      profile: truthy({ displayName, email, picture }),
      email,
      password,
      provider: ['local'],
    })
  )

  res.status(201).json({ data: newUser.getProfile() })
}

// router.route('/local/register').post(_(local_register))
export { local_register }

/**
 *   @desc    login existing user by sending new token
 *   @route   POST /api/v__/auth/local/login
 *   @access  Public
 */
async function local_login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && user.matchPasswords(password)) {
    res.json({ data: user.getProfile() })
  } else {
    throwHttpError(EmailOrPasswordIncorrect)
  }
}

// router.route('/local/login').post(_(local_login))
export { local_login }

/**
 *   @desc    receive old and new password and change the password in the database
 *   @route   POST /api/v__/auth/local/change_password
 *   @access  Private
 */
async function local_change_password(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) throw PrivateRouteError

  const { oldPassword, newPassword } = req.body
  const user = req.user

  if (!user.provider.some((e: string) => e === 'local') || !user.password) {
    throw new Error('error resting password')
  }

  if (!oldPassword) {
    throwHttpError(QuickValidationError({ oldPassword: 'this field is empty' }))
  }

  if (!newPassword) {
    throwHttpError(QuickValidationError({ newPassword: 'this field is empty' }))
  }

  if (user.matchPasswords(oldPassword)) {
    user.password = newPassword
    await user.save()
    res.json({ data: user.getProfile() })
  } else {
    throwHttpError(EmailOrPasswordIncorrect)
  }
}

// router.route('/local/change-password').post(auth, _(local_change_password))
export { local_change_password }

/**
 *   @desc    some users are not registered by email and password (exp: google)
 *            this route is there to set a new password
 *   @route   POST /api/v__/auth/local/set_password
 *   @access  Private
 */
async function local_set_password(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) throw PrivateRouteError

  const { newPassword } = req.body
  const user = req.user

  if (user.provider.some((e: string) => e === 'local') || user.password) {
    throwHttpError(ServerError('error setting password'))
  }

  if (!newPassword) {
    throwHttpError(QuickValidationError({ newPassword: 'this field is empty' }))
  }

  user.password = newPassword
  user.provider = toggleArrayElement(user.provider, 'local')
  await user.save()
  res.json({ data: user.getProfile() })
}

// router.route('/local/change-password').post(auth, _(local_set_password))
export { local_set_password }

/**
 *   @desc    receive old and new password and change the password in the database
 *   @route   GET /api/v__/auth/local/set_password
 *   @access  Private
 */
async function local_info(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body

  if (!email) {
    throwHttpError(QuickValidationError({ email: 'this field is empty' }))
  }

  const user = await User.findOne({ email })

  if (!user) res.send('sign up')
  else if (user.provider.some((e) => e === 'local') && user.password)
    res.send('login')
  else res.send('set password')
}

// router.route('/local/change-password').post(auth, _(local_set_password))
export { local_info }

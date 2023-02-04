import { requiredFields } from '@httpErrors'
import { Buffer } from 'buffer'
import {
  BadBasicToken,
  EmailOrPasswordIncorrect,
  UserAlreadyExist,
} from '@httpErrors/errTypes'
import User from '@models/User'
import of from '@utils/omitFalsy'
import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'
import { auth_local_login, auth_local_register } from 'types/routes/auth_local'
const local = Router()

/**
 *   @desc      Register a new user
 *   @route     POST /api/v__/auth/local/register
 *   @body      auth_local_register
 *   @response  ProfileDoc
 *   @access    Public
 */
async function local_register(req: Request, res: Response, next: NextFunction) {
  const { email, password } = BasicToken(req.header('Authorization'))

  const { displayName } = of(req.body) as auth_local_register

  const userExist = await User.findOne({ email })

  if (userExist) throw UserAlreadyExist()

  const newUser = await User.create({
    displayName,
    email,
    password: password,
    providers: ['local'],
  })
  res.status(201).json({ data: newUser.doc() })
}

/**
 *   @desc      Login existing user using email and password
 *   @route     POST /api/v__/auth/local/login
 *   @body      auth_local_login
 *   @response  ProfileDoc
 *   @access    Public
 */
async function local_login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = BasicToken(req.header('Authorization'))

  const user = await User.findOne({ email })

  if (
    user?.providers.includes('local') &&
    user?.matchPasswords(password || '')
  ) {
    res.json({ data: user.doc() })
  } else {
    throw EmailOrPasswordIncorrect()
  }
}

function BasicToken(req?: string) {
  var basicToken
  if (!(basicToken = req?.split(' ')[1]) || req?.split(' ')[0] !== 'Basic')
    throw BadBasicToken()
  const [email, password] = Buffer.from(basicToken, 'base64')
    .toString()
    .split(':')

  if (!email || !password) throw BadBasicToken()

  return { email, password }
}

local.route('/register').post(_(local_register))
local.route('/login').post(_(local_login))

export default local

import { EmailOrPasswordIncorrect, UserAlreadyExist } from '@error/Errors'
import HttpError from '@error/HttpError'
import auth from '@middlewares/auth'
import User from '@models/User'
import { NextFunction, Request, Response, Router } from 'express'
import _ from 'express-async-handler'
import passport from 'passport'

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

  const newUser = await User.create({
    userName,
    email,
    password,
    provider: 'local',
  })

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
// 302 to https://accounts.google.com/o/oauth2/v2/auth
router
  .route('/google')
  .get(passport.authenticate('google', { scope: ['email', 'profile'] }))

// then redirect here +++ this route will grab information from googleapis.com
// possible error:
// InternalOAuthError: Failed to obtain access token
//     at Strategy.OAuth2Strategy._createOAuthError (B:\_Portfolio\22 03 18 money tracker\backend\node_modules\passport-oauth2\lib\strategy.js:423:17)
//     at B:\_Portfolio\22 03 18 money tracker\backend\node_modules\passport-oauth2\lib\strategy.js:177:45
//     at B:\_Portfolio\22 03 18 money tracker\backend\node_modules\oauth\lib\oauth2.js:191:18
//     at ClientRequest.<anonymous> (B:\_Portfolio\22 03 18 money tracker\backend\node_modules\oauth\lib\oauth2.js:162:5)
//     at ClientRequest.emit (node:events:394:28)
//     at TLSSocket.socketErrorListener (node:_http_client:447:9)
//     at TLSSocket.emit (node:events:394:28)
//     at emitErrorNT (node:internal/streams/destroy:193:8)
//     at emitErrorCloseNT (node:internal/streams/destroy:158:3)
//     at processTicksAndRejections (node:internal/process/task_queues:83:21) {
//   oauthError: Error: getaddrinfo ENOTFOUND www.googleapis.com
//       at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:71:26) {
//     errno: -3008,
//     code: 'ENOTFOUND',
//     syscall: 'getaddrinfo',
//     hostname: 'www.googleapis.com'
//   }
// }
router.route('/google/callback').get(
  passport.authenticate('google', {
    failureRedirect: process.env.GOOGLE_CLIENT_CALLBACK_URL_FRONTEND_FAILURE,
  }),
  function (req, res) {
    res.redirect(process.env.GOOGLE_CLIENT_CALLBACK_URL_FRONTEND as string)
  }
)

export default router

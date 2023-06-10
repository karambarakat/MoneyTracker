import passport from 'passport'
import { Router } from 'express'
import { TokenFailed } from '@utils/httpError/errTypes'
import { TokenFailedE } from 'types/src/httpErrors'

const bearerAuth = Router()

bearerAuth.all('*', function (req, res, next) {
  passport.authenticate(
    'jwt',
    { session: false },
    function (err: false | Error, user: Express.User, info: Info) {
      // 1. pass {err: false, user: {...}, info: null}
      if (!err && user) {
        req.user = user
        return next()
      }
      // 2. fail {err: false, user: null, info: Info}
      // 3. fail {err: {...}, user: null, info: unknown}
      handleJWTError(err, info)
    },
  )(req, res, next)
})

type Info =
  | { name: 'TokenExpiredError'; message: never; expiredAt: string }
  | { name: 'JsonWebTokenError'; message: string; inner: unknown }
  | { name: 'JsonWebTokenError'; message: 'jwt malformed' }

function handleJWTError(err: Error | false, info: Info) {
  // possible value of Info, from `jsonWebToken` lib (see https://github.com/auth0/node-jsonwebtoken/tree/74d5719bd03993fcf71e3b176621f133eb6138c0/lib)
  // {"name":"TokenExpiredError", "expiredAt":"..."}
  // {"name":"JsonWebTokenError","message":string, "inner?":unknown}
  // {"name":"JsonWebTokenError","message":"jwt malformed"}
  // {"name":"NotBeforeError","date":"..."}

  // possible errors
  // new Error('No auth token')
  // new Error('SyntaxError')
  // new Error(...)
  const errorType: TokenFailedE['details']['type'] =
    (info as any)?.message === 'No auth token'
      ? 'NoTokenWasProvided'
      : info?.name || 'UnspecifiedError'

  const errorDate =
    (info?.name === 'TokenExpiredError' && info?.expiredAt) || null

  throw TokenFailed(errorType, errorDate)
}

// router.get(bearerAuth, protectedRoute)
export default bearerAuth

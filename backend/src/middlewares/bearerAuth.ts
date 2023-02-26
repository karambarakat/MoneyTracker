import passport from 'passport'
import { Router } from 'express'
import { TokenFailed } from '@httpErrors/errTypes'

const bearerAuth = Router()

type Info =
  | ({
    name?: string
    message?: string
    expiredAt?: string
    date?: string
  } & (
      | { name: 'TokenExpiredError'; expiredAt: string }
      | { name: 'JsonWebTokenError'; message: string; inner: unknown }
      | { name: 'JsonWebTokenError'; message: 'jwt malformed' }
    ))
  | undefined

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
      // possible value of Info, from `jsonWebToken` lib (see https://github.com/auth0/node-jsonwebtoken/tree/74d5719bd03993fcf71e3b176621f133eb6138c0/lib)
      // {"name":"TokenExpiredError", "expiredAt":"..."}
      // {"name":"JsonWebTokenError","message":string, "inner?":unknown}
      // {"name":"JsonWebTokenError","message":"jwt malformed"}
      // {"name":"NotBeforeError","date":"..."}
      // 3. fail {err: {...}, user: null, info: unknown}
      // new Error('No auth token')
      // new Error('SyntaxError')
      // new Error(...)
      const errorType:
        | 'JsonWebTokenError'
        | 'TokenExpiredError'
        | 'NoTokenWasProvided'
        | 'UnspecifiedError' =
        info?.message === 'No auth token'
          ? 'NoTokenWasProvided'
          : info?.name || 'UnspecifiedError'

      const errorDate = errorType === 'TokenExpiredError' && info?.expiredAt || null

      throw TokenFailed(errorType, errorDate)
    }
  )(req, res, next)
})

export default bearerAuth

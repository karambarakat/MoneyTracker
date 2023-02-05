import passport from 'passport'
import { Router } from 'express'
import { TokenFailed, UnAuthorized } from '@httpErrors/errTypes'

const auth = Router()

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
    // | { name: 'NotBeforeError'; date: string }
  | undefined

auth.all('*', function (req, res, next) {
  passport.authenticate(
    'jwt',
    { session: false },
    function (err, user, info: Info) {
      //pass {err: false, user: {...}, info: null}
      if (!err && user) {
        req.user = user
        return next()
      }

      // possible value of info, from `jsonWebToken` lib (see https://github.com/auth0/node-jsonwebtoken/tree/74d5719bd03993fcf71e3b176621f133eb6138c0/lib)
      // {"name":"TokenExpiredError", "expiredAt":"..."}
      // {"name":"JsonWebTokenError","message":string, "inner?":unknown}
      // {"name":"JsonWebTokenError","message":"jwt malformed"}
      // {"name":"NotBeforeError","date":"..."}
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

      const errorDate = errorType === 'TokenExpiredError' && info?.expiredAt

      throw TokenFailed(errorType, errorDate)
    }
  )(req, res, next)
})

export default auth

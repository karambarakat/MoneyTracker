import passport from 'passport'
import { Router } from 'express'
import {
  ExpiredToken,
  MalformedToken,
  UnAuthorized,
} from '@httpErrors/errTypes'

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
      | { name: 'NotBeforeError'; date: string }
    ))
  | undefined

auth.all('*', function (req, res, next) {
  passport.authenticate(
    'jwt',
    { session: false },
    function (err, user, info: Info) {
      //pass {false, {...}, null}
      if (!err && user) {
        req.user = user
        return next()
      }
      // possible value of info, from `jsonWebToken` lib (see https://github.com/auth0/node-jsonwebtoken/tree/74d5719bd03993fcf71e3b176621f133eb6138c0/lib)
      // {"name":"TokenExpiredError", "expiredAt":"..."}
      if (
        Object.getPrototypeOf(info).constructor?.name === 'TokenExpiredError' ||
        Object.getPrototypeOf(info).constructor?.name === 'NotBeforeError'
      ) {
        throw ExpiredToken(
          info?.expiredAt || info?.date || new Date().toISOString()
        )
      }

      if (
        Object.getPrototypeOf(info).constructor?.name === 'JsonWebTokenError'
      ) {
        throw MalformedToken(info)
      }
      // {"name":"JsonWebTokenError","message":string, "inner?":unknown}
      // {"name":"JsonWebTokenError","message":"jwt malformed"}
      // {"name":"NotBeforeError","date":"..."}
      throw UnAuthorized(info)
    }
  )(req, res, next)
})

export default auth

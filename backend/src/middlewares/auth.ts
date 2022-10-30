import passport from 'passport'
import { Router } from 'express'
import { ExpiredToken, UnAuthorized } from '@httpErrors/errTypes'

const auth = Router()

auth.all('*', function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    //invalid token {null, false, JsonWebTokenError}
    if (!err && user) {
      req.user = user
      return next()
    }

    if (Object.getPrototypeOf(info).constructor?.name === 'TokenExpiredError') {
      throw ExpiredToken(info?.expiredAt || new Date().toISOString())
    }

    throw UnAuthorized(info)
  })(req, res, next)
})

// export default passport.authenticate(['jwt'], { session: false })
export default auth

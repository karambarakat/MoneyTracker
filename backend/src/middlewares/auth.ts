import passport from 'passport'
import { Router } from 'express'
import HttpError from '@error/HttpError'
import { UnAuthorized } from '@error/Errors'

const auth = Router()

auth.all('*', function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    //auth success
    //invalid token {null, false, JsonWebTokenError}
    if (err) {
      HttpError(UnAuthorized(info))
    } else if (!user) {
      HttpError(UnAuthorized(info))
    } else {
      req.user = user
      return next()
    }
  })(req, res, next)
})

// export default passport.authenticate(['jwt'], { session: false })
export default auth

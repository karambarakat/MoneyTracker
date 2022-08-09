import passport from 'passport'
import { Router } from 'express'
import { throwHttpError } from '@httpErrors'
import { UnAuthorized } from '@httpErrors/errTypes'

const auth = Router()

auth.all('*', function (req, res, next) {
  passport.authenticate('jwt', { session: false }, function (err, user, info) {
    //auth success
    //invalid token {null, false, JsonWebTokenError}
    if (err) {
      throwHttpError(UnAuthorized(info))
    } else if (!user) {
      throwHttpError(UnAuthorized(info))
    } else {
      req.user = user
      return next()
    }
  })(req, res, next)
})

// export default passport.authenticate(['jwt'], { session: false })
export default auth

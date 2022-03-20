import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'
import * as User from '@models/user/User'

export const useJWT = new jwtStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  function (
    jwt_payload: { sub: string },
    done: (err: Error | null, user: Object | false) => void
  ) {
    User.findById(jwt_payload.sub)
      .then((user) => {
        user ? done(null, user.lean()) : done(null, false)
      })
      .catch((err) => done(err, false))
  }
)

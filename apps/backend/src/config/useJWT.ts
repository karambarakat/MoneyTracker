import User from '@models/User'
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'
import { Jwt } from 'types/dist/api'

const useJWT = new jwtStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  function (payload: Jwt, done) {
    User.findById(payload._id)
      .then(user => done(null, user || false))
      .catch(error => done(error, false))
  },
)

// passport.use(useJWT)
export { useJWT }

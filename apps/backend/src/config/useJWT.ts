import User from '@models/User'
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'
import { jwt_payload } from 'types/src/jwt'

const useJWT = new jwtStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  function (payload: jwt_payload, done) {
    User.findById(payload._id)
      .then(user => done(null, user || false))
      .catch(error => done(error, false))
  },
)

// passport.use(useJWT)
export { useJWT }

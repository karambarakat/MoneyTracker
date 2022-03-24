import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'
import User from '@models/User'
import { jwt_payload } from '@interfaces/jwt'

export const useJWT = new jwtStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async function (jwt_payload: jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.sub)
      user ? done(null, user.withToken()) : done(null, false)
    } catch (error) {
      done(error, false)
    }
  }
)

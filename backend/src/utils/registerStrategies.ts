import passport from 'passport'
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '@models/User'
import { jwt_payload } from 'types/jwt'

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

export const useGoogle = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL_BACKEND as string,
  },
  async function (accessToken, refreshToken, profile, done) {
    try {
      if (!profile.emails?.[0]?.value) throw new Error()

      const existUser = await User.findOne({
        provider: 'google',
        providerInfo: { id: profile.id },
      })
      if (!existUser) {
        const newUser = await User.create({
          userName: profile.displayName,
          email: profile.emails?.[0]?.value,
          provider: 'google',
          googleProfile: { accessToken, refreshToken, ...profile._json },
        })
        done(null, newUser)
      } else {
        done(null, existUser)
      }
    } catch (error) {
      //@ts-ignore
      done(error, undefined)
    }
  }
)

passport.serializeUser((user, done) => {
  //@ts-ignore
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  async function main() {
    const user = await User.findById(id)
    done(null, user)
  }
  main().catch((e) => done(e, false))
})

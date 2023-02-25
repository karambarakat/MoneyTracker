import User from '@models/User'
import _ from 'express-async-handler'
import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { addArrayElement } from '@utils/arrayElements'

/**
 * authentication flow
 *      1. GET http://localhost:8811/api/v1/auth/google
 *      2. 302 to concent screen https://accounts.google.com/o/oauth2/v2/auth
 *      3. give concent from google
 *      4. google will 302 you to `process.env.GOOGLE_CLIENT_CALLBACK_URL_BACKEND`
 *      5. receive GET http://localhost:8811/api/v__/auth/google/callback
 *          5.1. `receiveCallback` grap user info from 'googleapis.com'
 *              5.1.1. call the verifyCallback
 *          5.2. `redirectCallback`
 *          5.3. `googleErrorHandler`
 */

/**
 *   @desc  passport strategy
 *          @param options where I register variable
 *              like client_id, client_secret, etc
 *          @param verifyCallback I will have access to
 *              accessToken, refreshToken and profile
 *              to write them to the database
 */
const useGoogle = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL_BACKEND as string,
  },
  async function (accessToken, refreshToken, profile, done) {
    const email = profile.emails?.[0]?.value
    if (!email) throw new Error()

    const existUser = await User.findOne({
      email: email,
    })

    if (!existUser) {
      const newUser = await User.create({
        displayName: profile.displayName,
        email,
        providers: ['google'],
        picture: profile._json.picture,
        googleInfo: {
          accessToken,
          refreshToken,
          profile: profile._json,
        },
      })
      done(null, newUser)
      return
    }

    if (existUser && !existUser.providers.includes('google')) {
      existUser.providers = [...existUser.providers, 'google']
      existUser.googleInfo = {
        accessToken,
        refreshToken,
        profile: profile._json,
      }
      await existUser.save()

      done(null, existUser)
      return
    }

    if (existUser && existUser.providers.includes('google')) {
      done(null, existUser)
      return
    }
  }
)

// passport.use(useGoogle)
export { useGoogle }

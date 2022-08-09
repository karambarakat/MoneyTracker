import User from "@models/User";
import _ from 'express-async-handler'
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { IProfile, IUser, IUserDocument } from "@myTypes/ModelUser"
import { addArrayElement } from "@utils/arrayElements";

/**
 * authentication flow
 *      1. GET http://localhost:8811/api/v1/auth/google
 *      2. 302 to concent screen https://accounts.google.com/o/oauth2/v2/auth
 *      3. give concent from google
 *      4. google will 302 you to `process.env.GOOGLE_CLIENT_CALLBACK_URL_BACKEND`
 *      5. receive GET http://localhost:8811/api/v__/auth/google/callback
 *          5.1. `receiveCallback` grap user info from 'googleapis.com'
 *              6. call the verifyCallback
 *          5.2. `redirectCallback`
 *          5.3. `googleErrorHandler`
 *      
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
        try {
            const email = profile.emails?.[0]?.value
            if (!email) throw new Error()

            const existUser = await User.findOne({
                email: email,
            })

            if (!existUser) {
                const newUser = await User.create({
                    profile: {
                        displayName: profile.displayName,
                        email,
                        picture: profile._json.picture,
                    },
                    email,
                    provider: ['google'],
                    googleInfo: {
                        accessToken,
                        refreshToken,
                        profile: profile._json
                    },
                })
                done(null, newUser)
            } else {
                if (!existUser.provider.some(e => e === 'google') || !existUser.googleInfo) {
                    existUser.provider = addArrayElement(existUser.provider, 'google')
                    existUser.googleInfo = {
                        accessToken,
                        refreshToken,
                        profile: profile._json
                    };
                    await existUser.save()
                }
                done(null, existUser)
            }
        } catch (error: any) {
            done(error, undefined)
        }
    }
)

// passport.use(useGoogle)
export { useGoogle }


/**
 *   @desc    this will direct me to google concent screen
 *            302 to https://accounts.google.com/o/oauth2/v2/auth
 *   @route   GET /api/v__/auth/google
 *   @access  Public
 */
const authWithGoogle = passport.authenticate('google', {
    scope: ['email', 'profile']
})

// router.route('/google').get(google)
export { authWithGoogle }

/**
 *   @desc    after google get the concent from user
 *            it will redirect user to callback url (with query string the contains).
 *            passport will use the code in the query string to request info from googleapis.com
 *            example of the query:
              ```json
              {
                  code: '4/0AX4XfWg_iTJoqjXxks3MYa_3Zl_v8TSBtL9b7FwepcXMigxkpomsXB1DBw3AERWeeJQ6Gg',
                  scope: 'email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
                  authuser: '0',
                  prompt: 'consent'
              }
              ```
              with the information brought from googleapis the verifyCallback will be called
              then it will populate user info at `req.user`
 */
const receiveCallback = passport.authenticate('google', {
    failureRedirect: process.env.GOOGLE_CLIENT_CALLBACK_URL_FRONTEND_FAILURE,
})

/**
 *   @desc    after passport has populated `req.user`
 *            it is my job to define what is going to happen next 
 *            with this middleware
 */
async function redirectCallback(req: Request, res: Response) {
    const user = req.user

    const url = process.env.GOOGLE_CLIENT_CALLBACK_URL_FRONTEND as string
    const toQuery = '?user=' + JSON.stringify(user?.getProfile())
    res.redirect(url + toQuery)
}

/**
 * @desc response when the authentication fails, 
 *       usually `/api/v__/auth/google/callback`
 *       route is being visited by the browser
 *       simple response is better from UX perspective
 */
function googleErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    console.error(error)
    res.send('error with google authentication')
}

// router.route('/google/callback').get(googleCallback)
/**
 *   @desc    after google receive the concent 
 *            it will redirect user to this route.
 *            here we request the user info from google
 *            redirect to the front end with the user info
 *   @route   GET /api/v__/auth/google/callback
 *   @access  Public
 */
export const handleCallback = [
    receiveCallback,
    _(redirectCallback),
    googleErrorHandler
]


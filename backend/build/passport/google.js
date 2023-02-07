"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGoogle = void 0;
const User_1 = __importDefault(require("@models/User"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
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
const useGoogle = new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL_BACKEND,
}, async function (accessToken, refreshToken, profile, done) {
    const email = profile.emails?.[0]?.value;
    if (!email)
        throw new Error();
    const existUser = await User_1.default.findOne({
        email: email,
    });
    if (!existUser) {
        const newUser = await User_1.default.create({
            displayName: profile.displayName,
            email,
            providers: ['google'],
            picture: profile._json.picture,
            googleInfo: {
                accessToken,
                refreshToken,
                json: profile._json,
            },
        });
        done(null, newUser);
        return;
    }
    if (existUser && !existUser.providers.includes('google')) {
        existUser.providers = [...existUser.providers, 'google'];
        existUser.googleInfo = {
            accessToken,
            refreshToken,
            json: profile._json,
        };
        await existUser.save();
        done(null, existUser);
        return;
    }
    if (existUser && existUser.providers.includes('google')) {
        done(null, existUser);
        return;
    }
});
exports.useGoogle = useGoogle;

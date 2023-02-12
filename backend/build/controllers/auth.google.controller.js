"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const google = (0, _express.Router)();

/**
 * authentication flow
 *      1. GET http://localhost:8811/api/v1/auth/google
 *      2. 302 to concent screen https://accounts.google.com/o/oauth2/v2/auth
 *      3. give concent from google
 *      4. google will 302 you to `process.env.GOOGLE_CLIENT_CALLBACK_URL_BACKEND`
 *      5. receive GET http://localhost:8811/api/v__/auth/google/callback
 *          5.1. `receiveCallback` grap user info from 'googleapis.com'
 *              5.1.1. call the verifyCallback (the logic is in the passport strategy)
 *          5.2. `redirectCallback`
 *          5.3. if any error `googleErrorHandler`
 */

/**
 *   @desc    this will direct me to google concent screen
 *            302 to https://accounts.google.com/o/oauth2/v2/auth
 *   @route   GET /api/v__/auth/google
 *   @access  Public
 */
google.route('/').get(_passport.default.authenticate('google', {
  scope: ['email', 'profile']
}));

/**
 *   @desc    after google receive the concent
 *            it will redirect user to this route.
 *            here we request the user info from googleapis
 *            redirect to the front end with the user info
 *   @steps
 *      1.after granting the concent google will redirect the
 *        user to this route, Passport will use the code attached
 *        as query to fetch user's info fro googleapis and populate
 *        `req.user` (call the verifyCallback)
 *      2.it is my job to define what is going to happen next
 *        with this middleware
 *      3.response when the authentication fails, usually
 *        `/api/v__/auth/google/callback` route is being
 *        visited by the browser simple response is better
 *        from UX perspective
 *   @route   GET /api/v__/auth/google/callback
 *   @access  Public
 */
const callbackRouter = (0, _express.Router)();

// step 1
callbackRouter.use(_passport.default.authenticate('google', {
  failureRedirect: process.env.GOOGLE_CLIENT_CALLBACK_URL_FRONTEND_FAILURE
}));

// step 2
/**
let queryString = {
  "_id": "62f441f966b72b4ee6cdea28",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYzODNiMTM2ZGY1NmMyODc4ODFmZWEiLCJlbWFpbCI6ImthcmFtLmJhcmFrYXQuOTlAZ21haWwuY29tIiwiaWF0IjoxNjYwMTI3MzU0LCJleHAiOjE2NjAzMDAxNTR9.BYGDcGlU6sUmK8ibZd8lImJdbCcOzZbSGxwA1ZrQKcA",
  "displayName": "Karam Barakat"
}
*/
callbackRouter.use('/', (req, res) => {
  const profile = req.user?.doc();
  if (!profile) throw Error();
  const url = process.env.GOOGLE_CLIENT_CALLBACK_URL_FRONTEND;
  const params = {
    _id: profile._id,
    token: profile.token,
    displayName: profile.displayName
  };

  // @ts-ignore
  const toQuery = new URLSearchParams(params).toString();
  res.redirect(url + '?' + toQuery);
});

// step 3
callbackRouter.use(function (error, req, res, next) {
  console.error(error);
  res.send('error with google authentication');
});
google.get('/callback', callbackRouter);
var _default = google;
exports.default = _default;
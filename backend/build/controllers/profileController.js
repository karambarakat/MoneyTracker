"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _errTypes = require("./..\\httpErrors\\errTypes");
var _index = require("./..\\httpErrors\\index");
var _auth = _interopRequireDefault(require("./..\\middlewares\\auth"));
var _User = _interopRequireDefault(require("./..\\models\\User"));
var _express = require("express");
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _omitFalsy = _interopRequireDefault(require("./..\\utils\\omitFalsy"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();

/**
 *   @desc      get current registered user by their JWT
 *   @route     GET /api/v__/profile/status
 *   @body      profile_status
 *   @response  array of all providers for given email,
 *              when empty array the user is not signed up
 *   @access    Public
 */
async function emailProvidersStatus(req, res, next) {
  const {
    email
  } = (0, _omitFalsy.default)(req.body);
  (0, _index.requiredFields)({
    email
  });
  const providers = await _User.default.findOne({
    email
  });
  res.json({
    data: providers?.providers || []
  });
}

/**
 *   @desc    get current registered user by their JWT
 *   @route   GET /api/v__/profile
 *   @access  Private
 */
async function getCurrentUser(req, res, next) {
  if (!req.user) throw (0, _errTypes.PrivateRoute)();
  res.json({
    data: req.user.doc()
  });
}

/**
 *   @desc      get current registered user by their JWT
 *   @route     PUT /api/v__/profile
 *   @body      profile_update
 *   @response  ProfileDoc
 *   @access    Private
 */
async function updateCurrentUser(req, res, next) {
  if (!req.user) throw (0, _errTypes.PrivateRoute)();
  const {
    displayName,
    picture
  } = (0, _omitFalsy.default)(req.body);
  req.user.displayName = displayName || req.user.displayName;
  req.user.picture = picture || req.user.picture;
  await req.user.save();
  res.json({
    data: req.user.doc()
  });
}

/**
 *   @desc    receive old and new password and change the password in the database
 *   @route   POST /api/v__/auth/local/change_password
 *   @body      updatePassword_local or updatePassword_nolocal
 *   @response  ProfileDoc
 *   @access  Private
 */
async function updatePassword(req, res, next) {
  if (!req.user) throw (0, _errTypes.PrivateRoute)();
  if (req.user.providers.includes('local')) {
    const {
      newPassword,
      oldPassword
    } = (0, _omitFalsy.default)(req.body);
    (0, _index.requiredFields)({
      newPassword,
      oldPassword
    });
    if (!req.user.matchPasswords(oldPassword)) throw (0, _errTypes.EmailOrPasswordIncorrect)();
    req.user.password = newPassword;
    await req.user.save();
  } else {
    const {
      newPassword
    } = (0, _omitFalsy.default)(req.body);
    (0, _index.requiredFields)({
      newPassword
    });
    req.user.password = newPassword;
    req.user.providers = [...req.user.providers, 'local'];
    await req.user.save();
  }
  res.json({
    data: req.user.doc()
  });
}
router.get('/status', (0, _expressAsyncHandler.default)(emailProvidersStatus));
router.get('/', _auth.default, (0, _expressAsyncHandler.default)(getCurrentUser));
router.put('/', _auth.default, (0, _expressAsyncHandler.default)(updateCurrentUser));
router.put('/password', _auth.default, (0, _expressAsyncHandler.default)(updatePassword));
var _default = router;
exports.default = _default;
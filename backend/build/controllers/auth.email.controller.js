"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _errTypes = require("./..\\httpErrors\\errTypes");
var _User = _interopRequireDefault(require("./..\\models\\User"));
var _omitFalsy = _interopRequireDefault(require("./..\\utils\\omitFalsy"));
var _express = require("express");
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const local = (0, _express.Router)();

/**
 *   @desc      Register a new user
 *   @route     POST /api/v__/auth/local/register
 *   @body      auth_local_register
 *   @response  ProfileDoc
 *   @access    Public
 */
async function local_register(req, res, next) {
  const {
    email,
    password
  } = req.getBasicToken();
  console.log({
    email,
    password
  });
  const {
    displayName
  } = (0, _omitFalsy.default)(req.body);
  const userExist = await _User.default.findOne({
    email
  });
  if (userExist) throw (0, _errTypes.UserAlreadyExist)();
  const newUser = await _User.default.create({
    displayName,
    email,
    password: password,
    providers: ['local']
  });
  res.status(201).json({
    data: newUser.doc()
  });
}

/**
 *   @desc      Login existing user using email and password
 *   @route     POST /api/v__/auth/local/login
 *   @body      auth_local_login
 *   @response  ProfileDoc
 *   @access    Public
 */
async function local_login(req, res, next) {
  const {
    email,
    password
  } = req.getBasicToken();
  const user = await _User.default.findOne({
    email
  });
  if (user?.providers.includes('local') && user?.matchPasswords(password || '')) {
    res.json({
      data: user.doc()
    });
  } else {
    throw (0, _errTypes.EmailOrPasswordIncorrect)();
  }
}
local.route('/register').post((0, _expressAsyncHandler.default)(local_register));
local.route('/login').post((0, _expressAsyncHandler.default)(local_login));
var _default = local;
exports.default = _default;
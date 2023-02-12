"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _passport = _interopRequireDefault(require("passport"));
var _express = require("express");
var _errTypes = require("./..\\httpErrors\\errTypes");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const auth = (0, _express.Router)();
auth.all('*', function (req, res, next) {
  _passport.default.authenticate('jwt', {
    session: false
  }, function (err, user, info) {
    //pass {err: false, user: {...}, info: null}
    if (!err && user) {
      req.user = user;
      return next();
    }

    // possible value of info, from `jsonWebToken` lib (see https://github.com/auth0/node-jsonwebtoken/tree/74d5719bd03993fcf71e3b176621f133eb6138c0/lib)
    // {"name":"TokenExpiredError", "expiredAt":"..."}
    // {"name":"JsonWebTokenError","message":string, "inner?":unknown}
    // {"name":"JsonWebTokenError","message":"jwt malformed"}
    // {"name":"NotBeforeError","date":"..."}
    // new Error('No auth token')
    // new Error('SyntaxError')
    // new Error(...)
    const errorType = info?.message === 'No auth token' ? 'NoTokenWasProvided' : info?.name || 'UnspecifiedError';
    const errorDate = errorType === 'TokenExpiredError' && info?.expiredAt;
    throw (0, _errTypes.TokenFailed)(errorType, errorDate);
  })(req, res, next);
});
var _default = auth;
exports.default = _default;
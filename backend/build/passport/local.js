"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useJWT = void 0;
var _User = _interopRequireDefault(require("./..\\models\\User"));
var _passportJwt = require("passport-jwt");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const useJWT = new _passportJwt.Strategy({
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
}, function (payload, done) {
  _User.default.findById(payload._id).then(user => done(null, user || false)).catch(error => done(error, false));
});

// passport.use(useJWT)
exports.useJWT = useJWT;
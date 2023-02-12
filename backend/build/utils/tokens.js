"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = generateToken;
exports.generateTokenToBody = generateTokenToBody;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function generateTokenToBody(body) {
  return _jsonwebtoken.default.sign(body, process.env.JWT_SECRET, {
    expiresIn: '2d'
  });
}
function generateToken(id, email) {
  return _jsonwebtoken.default.sign({
    _id: id,
    email
  }, process.env.JWT_SECRET, {
    expiresIn: '2d'
  });
}
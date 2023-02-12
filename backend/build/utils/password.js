"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = hashPassword;
exports.matchPasswords = matchPasswords;
var _crypto = _interopRequireDefault(require("crypto"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const salt = process.env.SALT;
const hash = string => _crypto.default.pbkdf2Sync(string, salt, 100, 64, 'sha512').toString('hex');
function hashPassword(password) {
  return hash(password);
}
function matchPasswords(hashed, toMatch) {
  const toMatchHashed = hash(toMatch);
  return toMatchHashed === hashed;
}
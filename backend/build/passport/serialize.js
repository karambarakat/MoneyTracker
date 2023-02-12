"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
var _User = _interopRequireDefault(require("./..\\models\\User"));
var _passport = _interopRequireDefault(require("passport"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _default() {
  _passport.default.serializeUser((user, done) => {
    done(null, user._id);
  });
  _passport.default.deserializeUser((id, done) => {
    async function main() {
      const user = await _User.default.findById(id);
      user ? done(null, user) : done(null, false);
    }
    main().catch(e => done(e, false));
  });
}
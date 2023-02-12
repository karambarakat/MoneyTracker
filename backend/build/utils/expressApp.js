"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = expressApp;
var _errTypes = require("./..\\httpErrors\\errTypes");
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function expressApp() {
  const app = (0, _express.default)();
  app.use('static', _express.default.static('static'));
  app.use((req, res, next) => {
    req.getBasicToken = () => BasicToken(req.header('Authorization'));
    next();
  });
  return app;
}
function BasicToken(header) {
  var basicToken;
  if (!(basicToken = header?.split(' ')[1]) || header?.split(' ')[0] !== 'Basic') {
    throw (0, _errTypes.BadBasicToken)();
  }
  const [email, password] = Buffer.from(basicToken, 'base64').toString().split(':');
  if (!email || !password) throw (0, _errTypes.BadBasicToken)();
  return {
    email,
    password
  };
}
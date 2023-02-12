"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disconnect = exports.default = void 0;
var _log = _interopRequireDefault(require("./..\\utils\\log"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function connect() {
  (0, _log.default)('database', 'connecting ...');
  var url = process.env.MONGO_STRING;
  await _mongoose.default.connect(url).catch(err => {
    (0, _log.default)('database', 'failed', err);
    throw new Error('database failed to connect');
  });
  (0, _log.default)('database', 'connected');
}
const disconnect = _mongoose.default.disconnect;
exports.disconnect = disconnect;
var _default = connect;
exports.default = _default;
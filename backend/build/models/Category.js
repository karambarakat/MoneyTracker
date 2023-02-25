"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CategorySchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  icon: {
    type: String
  },
  createdBy: {
    type: _mongoose.default.Types.ObjectId
  }
});
CategorySchema.methods.doc = function () {
  return this._doc;
};
var _default = _mongoose.default.model('category', CategorySchema);
exports.default = _default;
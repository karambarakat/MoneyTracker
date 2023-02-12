"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  validator: function (email) {
    return /^\S+@\S+\.\S+$/.test(email);
  },
  message: 'not a valid email'
};
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = omitFalsy;
function omitFalsy(obj) {
  return Object.keys(obj).filter(key => Boolean(obj[key])).reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {});
}
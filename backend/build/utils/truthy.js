"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = truthy;
/**
 * receive obj and return another object with only properties with truthy value
 * @param obj plain javascript object
 * @returns plain javascript object with properties with truthy value only
 */
function truthy(obj) {
  const rtObj = {};
  Object.keys(obj).map(key => {
    if (obj[key]) {
      rtObj[key] = obj[key];
    }
  });
  return rtObj;
}
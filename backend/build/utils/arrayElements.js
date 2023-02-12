"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addArrayElement = addArrayElement;
exports.removeArrayElement = removeArrayElement;
exports.toggleArrayElement = toggleArrayElement;
function toggleArrayElement(arr, element) {
  if (arr.some(e => e === element)) {
    arr.splice(arr.findIndex(e => e === element), 1);
    return arr;
  } else {
    arr.push(element);
    return arr;
  }
}
function addArrayElement(arr, element) {
  if (arr.some(e => e === element)) {
    return arr;
  } else {
    arr.push(element);
    return arr;
  }
}
function removeArrayElement(arr, element) {
  if (arr.some(e => e === element)) {
    arr.splice(arr.findIndex(e => e === element), 1);
    return arr;
  } else {
    return arr;
  }
}
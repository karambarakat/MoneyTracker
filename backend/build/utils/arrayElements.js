"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeArrayElement = exports.addArrayElement = exports.toggleArrayElement = void 0;
function toggleArrayElement(arr, element) {
    if (arr.some(e => e === element)) {
        arr.splice(arr.findIndex(e => e === element), 1);
        return arr;
    }
    else {
        arr.push(element);
        return arr;
    }
}
exports.toggleArrayElement = toggleArrayElement;
function addArrayElement(arr, element) {
    if (arr.some(e => e === element)) {
        return arr;
    }
    else {
        arr.push(element);
        return arr;
    }
}
exports.addArrayElement = addArrayElement;
function removeArrayElement(arr, element) {
    if (arr.some(e => e === element)) {
        arr.splice(arr.findIndex(e => e === element), 1);
        return arr;
    }
    else {
        return arr;
    }
}
exports.removeArrayElement = removeArrayElement;

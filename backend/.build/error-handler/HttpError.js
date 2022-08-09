"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpQuickError = void 0;
function HttpError(error) {
    const CustomError = new Error(error.message);
    //@ts-ignore
    CustomError.customError = error;
    throw CustomError;
}
exports.default = HttpError;
function HttpQuickError(status, message, name, details) {
    const CustomError = new Error(message);
    const quickError = {
        status,
        message,
        name: name || 'RequestError',
        details: details || {},
    };
    // @ts-ignore
    CustomError.customError = quickError;
    throw CustomError;
}
exports.HttpQuickError = HttpQuickError;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTPErrorHandler = HTTPErrorHandler;
exports.isHttpError = exports.HttpError = void 0;
exports.requiredFields = requiredFields;
exports.throwQuickHttpError = throwQuickHttpError;
var _errTypes = require("./errTypes");
const DefaultError = {
  details: undefined,
  message: 'UnspecifiedError',
  name: 'UnspecifiedError',
  status: 500
};
const isHttpError = Symbol('HttpError');
exports.isHttpError = isHttpError;
class HttpError extends Error {
  [isHttpError] = true;
  constructor(args) {
    super(args.message || DefaultError.message);
    this.status = args.status || DefaultError.status;
    this.name = args.name || DefaultError.name;
    this.details = args.details || DefaultError.details;
  }
}
exports.HttpError = HttpError;
function HTTPErrorHandler(err, req, res, next) {
  if (!err[isHttpError]) next(err);else {
    res.status(err.status).json({
      data: null,
      error: {
        status: err.status,
        message: err.message,
        name: err.name,
        details: err.details
      }
    });
  }
}
function requiredFields(object) {
  if (Object.values(object).some(e => e === null || typeof e === 'undefined')) {
    throw (0, _errTypes.FieldsRequired)(Object.keys(object).filter(key => {
      const value = object[key];
      if (value === '' || value === null || typeof value === 'undefined') return true;
      return false;
    }));
  }
}
function throwQuickHttpError(status, message, name, details) {
  const CustomError = new HttpError({
    message,
    status,
    details,
    name: name || DefaultError.name
  });
  throw CustomError;
}
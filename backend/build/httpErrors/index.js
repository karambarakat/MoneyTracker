"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTTPErrorHandler = HTTPErrorHandler;
exports.HttpErrorS = exports.HttpError = void 0;
exports.requiredFields = requiredFields;
exports.throwQuickHttpError = throwQuickHttpError;
var _httpErrors = require("../typesIntegrate/httpErrors");
var _errTypes = require("./errTypes");
const HttpErrorS = Symbol('HttpError');
exports.HttpErrorS = HttpErrorS;
class HttpError extends Error {
  [HttpErrorS] = true;
  constructor(args) {
    super(args.message || _httpErrors.DefaultError.message);
    this.status = args.status || _httpErrors.DefaultError.status;
    this.name = args.name || _httpErrors.DefaultError.name;
    this.details = args.details || _httpErrors.DefaultError.details;
  }
}
exports.HttpError = HttpError;
function HTTPErrorHandler(err, req, res, next) {
  if (!(err instanceof HttpError)) next(err);else {
    res.status(err.status).json({
      data: null,
      error: {
        status: err.status,
        message: err.message,
        name: err.name,
        details: {
          ...err.details
        }
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
    name: name || _httpErrors.DefaultError.name
  });
  throw CustomError;
}
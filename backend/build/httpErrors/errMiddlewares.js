"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.e400_JsonError = e400_JsonError;
exports.e400_MongooseValidation = e400_MongooseValidation;
exports.e404_ResourceNotFound = e404_ResourceNotFound;
exports.e500_ServerError = e500_ServerError;
var _errTypes = require("./errTypes");
function e400_JsonError(err, req, res, next) {
  if (err.name === 'SyntaxError' && err.message.startsWith('Unexpected string in JSON at position')) {
    throw (0, _errTypes.BadJsonPayload)();
  } else {
    next(err);
  }
}
function e404_ResourceNotFound() {
  throw (0, _errTypes.ResourceWasNotFound)();
}
function e400_MongooseValidation(err, req, res, next) {
  if (err.name === 'ValidationError' && err.errors) {
    const validationError = new Error(err._message);
    validationError.errors = Object.keys(err.errors).reduce((acc, key) => {
      acc[key] = err.errors[key].message;
      return acc;
    }, {});
    throw (0, _errTypes.ValidationError)(validationError);
  } else {
    next(err);
  }
}
function e500_ServerError(err, req, res, next) {
  console.error(err);
  res.status((0, _errTypes.UnknownServerError)().status).json({
    status: (0, _errTypes.UnknownServerError)().status,
    message: (0, _errTypes.UnknownServerError)().message,
    name: (0, _errTypes.UnknownServerError)().name,
    details: {}
  });
}
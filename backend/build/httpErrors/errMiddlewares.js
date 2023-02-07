"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e500_ServerError = exports.e400_MongooseValidation = exports.e404_ResourceNotFound = exports.e400_JsonError = void 0;
const errTypes_1 = require("@httpErrors/errTypes");
function e400_JsonError(err, req, res, next) {
    if (err.name === 'SyntaxError' &&
        err.message.startsWith('Unexpected string in JSON at position')) {
        throw (0, errTypes_1.BadJsonPayload)();
    }
    else {
        next(err);
    }
}
exports.e400_JsonError = e400_JsonError;
function e404_ResourceNotFound() {
    throw (0, errTypes_1.ResourceWasNotFound)();
}
exports.e404_ResourceNotFound = e404_ResourceNotFound;
function e400_MongooseValidation(err, req, res, next) {
    if (err.name === 'ValidationError' && err.errors) {
        const validationError = new Error(err._message);
        validationError.errors = Object.keys(err.errors).reduce((acc, key) => {
            acc[key] = err.errors[key].message;
            return acc;
        }, {});
        throw (0, errTypes_1.ValidationError)(validationError);
    }
    else {
        next(err);
    }
}
exports.e400_MongooseValidation = e400_MongooseValidation;
function e500_ServerError(err, req, res, next) {
    console.error(err);
    res.status((0, errTypes_1.UnknownServerError)().status).json({
        status: (0, errTypes_1.UnknownServerError)().status,
        message: (0, errTypes_1.UnknownServerError)().message,
        name: (0, errTypes_1.UnknownServerError)().name,
        details: {},
    });
}
exports.e500_ServerError = e500_ServerError;

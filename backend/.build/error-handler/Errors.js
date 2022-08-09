"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.UnknownServerError = exports.ResourceWasNotFound = exports.EmailIsUsed = exports.UserAlreadyExist = exports.EmailOrPasswordIncorrect = exports.EmptyBody = void 0;
exports.EmptyBody = {
    status: 400,
    name: 'HttpErrorMissingFields',
    message: `all fields are missing`,
    details: {},
};
exports.EmailOrPasswordIncorrect = {
    status: 401,
    name: 'EmailOrPasswordIncorrect',
    message: "the email or the password doesn't match our records",
    details: {},
};
exports.UserAlreadyExist = {
    status: 400,
    name: 'UserAlreadyExist',
    message: 'User already exist.',
    details: {},
};
exports.EmailIsUsed = {
    status: 400,
    name: 'EmailIsUsed',
    message: 'Email is used.',
    details: {},
};
exports.ResourceWasNotFound = {
    status: 404,
    name: 'ResourceWasNotFound',
    message: "couldn't find the target",
    details: {},
};
exports.UnknownServerError = {
    status: 500,
    name: 'UnknownServerError',
    message: 'Unknown error occurred in the server.',
    details: {},
};
const ValidationError = (error) => ({
    status: 400,
    name: 'ValidationError',
    message: error.message || 'some fields are not valid',
    details: {
        errors: error.errors,
    },
});
exports.ValidationError = ValidationError;

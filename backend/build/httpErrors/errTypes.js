"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnAuthorized = exports.TokenFailed = exports.FailedToDelete = exports.NoCategory = exports.NoLog = exports.PrivateRoute = exports.BadJsonPayload = exports.ValidationError = exports.UnknownServerError = exports.ResourceWasNotFound = exports.EmailIsUsed = exports.UserAlreadyExist = exports.EmailOrPasswordIncorrect = exports.BadBasicToken = exports.FieldsRequired = void 0;
const _1 = require(".");
function FieldsRequired(keys) {
    return new _1.HttpError({
        status: 400,
        name: 'SomeFieldsRequired',
        message: `these fields are required: ${keys.join(', ')}`,
        details: {
            errors: keys.reduce((acc, key) => {
                acc[key] = `\`${key}\` is required`;
                return acc;
            }, {}),
        },
    });
}
exports.FieldsRequired = FieldsRequired;
const BadBasicToken = () => new _1.HttpError({
    status: 401,
    name: 'BadBasicToken',
    message: 'email and password not provided',
    details: undefined,
});
exports.BadBasicToken = BadBasicToken;
const EmailOrPasswordIncorrect = () => new _1.HttpError({
    status: 401,
    name: 'EmailOrPasswordIncorrect',
    message: 'email/password were/was wrong or not provided',
    details: undefined,
});
exports.EmailOrPasswordIncorrect = EmailOrPasswordIncorrect;
function UserAlreadyExist() {
    return new _1.HttpError({
        status: 409,
        name: 'UserAlreadyExist',
        message: 'User already exist.',
        details: {
            errors: { email: 'this email is used' },
        },
    });
}
exports.UserAlreadyExist = UserAlreadyExist;
function EmailIsUsed() {
    return new _1.HttpError({
        status: 400,
        name: 'EmailIsUsed',
        message: 'Email is used.',
        details: undefined,
    });
}
exports.EmailIsUsed = EmailIsUsed;
function ResourceWasNotFound() {
    return new _1.HttpError({
        status: 404,
        name: 'ResourceWasNotFound',
        message: "couldn't find the target",
        details: undefined,
    });
}
exports.ResourceWasNotFound = ResourceWasNotFound;
function UnknownServerError() {
    return new _1.HttpError({
        status: 500,
        name: 'UnknownServerError',
        message: 'Unknown error occurred in the server.',
        details: undefined,
    });
}
exports.UnknownServerError = UnknownServerError;
function ValidationError(error) {
    return new _1.HttpError({
        status: 400,
        name: 'ValidationError',
        message: error.message || 'some fields are not valid',
        details: {
            errors: error.errors,
        },
    });
}
exports.ValidationError = ValidationError;
// export const QuickValidationError: (
//   fields: Record<string, string>
// ) => ValidationE = (fields) => ({
//   status: 400,
//   name: 'ValidationError',
//   message: 'some fields are not valid',
//   details: {
//     errors: fields,
//   },
// })
// export const ServerError: (message: string) => UnknownServerErrorE = (message) => ({
//   status: 500,
//   name: 'UnknownServerError',
//   message: message || 'Unknown error occurred in the server.',
//   details: undefined,
// })
function BadJsonPayload() {
    return new _1.HttpError({
        status: 400,
        name: 'JsonSyntaxError',
        message: "can't parse the json payload",
        details: undefined,
    });
}
exports.BadJsonPayload = BadJsonPayload;
const PrivateRoute = () => new _1.HttpError({
    status: 500,
    name: 'ServerError',
    message: 'authentication error, private route',
    details: undefined,
});
exports.PrivateRoute = PrivateRoute;
const NoLog = () => new _1.HttpError({
    status: 500,
    name: 'ServerError',
    message: "log wasn't found",
    details: undefined,
});
exports.NoLog = NoLog;
const NoCategory = () => new _1.HttpError({
    status: 500,
    name: 'ServerError',
    message: "category wasn't found",
    details: undefined,
});
exports.NoCategory = NoCategory;
const FailedToDelete = () => new _1.HttpError({
    status: 500,
    name: 'ServerError',
    message: 'failed to delete',
    details: undefined,
});
exports.FailedToDelete = FailedToDelete;
const TokenFailed = (type, date) => new _1.HttpError({
    status: 401,
    name: 'TokenFailed',
    message: 'authorization failed',
    details: {
        type,
        ...((date && { date }) || {}),
    },
});
exports.TokenFailed = TokenFailed;
const UnAuthorized = (info) => new _1.HttpError({
    status: 401,
    name: 'UnAuthorized',
    message: 'authentication failed',
    details: info,
});
exports.UnAuthorized = UnAuthorized;

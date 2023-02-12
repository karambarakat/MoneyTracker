"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BadBasicToken = void 0;
exports.BadJsonPayload = BadJsonPayload;
exports.EmailIsUsed = EmailIsUsed;
exports.FailedToDelete = exports.EmailOrPasswordIncorrect = void 0;
exports.FieldsRequired = FieldsRequired;
exports.PrivateRoute = exports.NoLog = exports.NoCategory = void 0;
exports.ResourceWasNotFound = ResourceWasNotFound;
exports.UnAuthorized = exports.TokenFailed = void 0;
exports.UnknownServerError = UnknownServerError;
exports.UserAlreadyExist = UserAlreadyExist;
exports.ValidationError = ValidationError;
var _ = require(".");
function FieldsRequired(keys) {
  return new _.HttpError({
    status: 400,
    name: 'SomeFieldsRequired',
    message: `these fields are required: ${keys.join(', ')}`,
    details: {
      errors: keys.reduce((acc, key) => {
        acc[key] = `\`${key}\` is required`;
        return acc;
      }, {})
    }
  });
}
const BadBasicToken = () => new _.HttpError({
  status: 401,
  name: 'BadBasicToken',
  message: 'email and password not provided',
  details: undefined
});
exports.BadBasicToken = BadBasicToken;
const EmailOrPasswordIncorrect = () => new _.HttpError({
  status: 401,
  name: 'EmailOrPasswordIncorrect',
  message: 'email/password were/was wrong or not provided',
  details: undefined
});
exports.EmailOrPasswordIncorrect = EmailOrPasswordIncorrect;
function UserAlreadyExist() {
  return new _.HttpError({
    status: 409,
    name: 'UserAlreadyExist',
    message: 'User already exist.',
    details: {
      errors: {
        email: 'this email is used'
      }
    }
  });
}
function EmailIsUsed() {
  return new _.HttpError({
    status: 400,
    name: 'EmailIsUsed',
    message: 'Email is used.',
    details: undefined
  });
}
function ResourceWasNotFound() {
  return new _.HttpError({
    status: 404,
    name: 'ResourceWasNotFound',
    message: "couldn't find the target",
    details: undefined
  });
}
function UnknownServerError() {
  return new _.HttpError({
    status: 500,
    name: 'UnknownServerError',
    message: 'Unknown error occurred in the server.',
    details: undefined
  });
}
function ValidationError(error) {
  return new _.HttpError({
    status: 400,
    name: 'ValidationError',
    message: error.message || 'some fields are not valid',
    details: {
      errors: error.errors
    }
  });
}

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
  return new _.HttpError({
    status: 400,
    name: 'JsonSyntaxError',
    message: "can't parse the json payload",
    details: undefined
  });
}
const PrivateRoute = () => new _.HttpError({
  status: 500,
  name: 'ServerError',
  message: 'authentication error, private route',
  details: undefined
});
exports.PrivateRoute = PrivateRoute;
const NoLog = () => new _.HttpError({
  status: 500,
  name: 'ServerError',
  message: "log wasn't found",
  details: undefined
});
exports.NoLog = NoLog;
const NoCategory = () => new _.HttpError({
  status: 500,
  name: 'ServerError',
  message: "category wasn't found",
  details: undefined
});
exports.NoCategory = NoCategory;
const FailedToDelete = () => new _.HttpError({
  status: 500,
  name: 'ServerError',
  message: 'failed to delete',
  details: undefined
});
exports.FailedToDelete = FailedToDelete;
const TokenFailed = (type, date) => new _.HttpError({
  status: 401,
  name: 'TokenFailed',
  message: 'authorization failed',
  details: {
    type,
    ...(date && {
      date
    } || {})
  }
});
exports.TokenFailed = TokenFailed;
const UnAuthorized = info => new _.HttpError({
  status: 401,
  name: 'UnAuthorized',
  message: 'authentication failed',
  details: info
});
exports.UnAuthorized = UnAuthorized;
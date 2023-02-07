"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
const errTypes_1 = require("@httpErrors/errTypes");
const auth = (0, express_1.Router)();
auth.all('*', function (req, res, next) {
    passport_1.default.authenticate('jwt', { session: false }, function (err, user, info) {
        //pass {err: false, user: {...}, info: null}
        if (!err && user) {
            req.user = user;
            return next();
        }
        // possible value of info, from `jsonWebToken` lib (see https://github.com/auth0/node-jsonwebtoken/tree/74d5719bd03993fcf71e3b176621f133eb6138c0/lib)
        // {"name":"TokenExpiredError", "expiredAt":"..."}
        // {"name":"JsonWebTokenError","message":string, "inner?":unknown}
        // {"name":"JsonWebTokenError","message":"jwt malformed"}
        // {"name":"NotBeforeError","date":"..."}
        // new Error('No auth token')
        // new Error('SyntaxError')
        // new Error(...)
        const errorType = info?.message === 'No auth token'
            ? 'NoTokenWasProvided'
            : info?.name || 'UnspecifiedError';
        const errorDate = errorType === 'TokenExpiredError' && info?.expiredAt;
        throw (0, errTypes_1.TokenFailed)(errorType, errorDate);
    })(req, res, next);
});
exports.default = auth;

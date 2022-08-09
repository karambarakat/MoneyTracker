"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("@error/Errors");
const HttpError_1 = __importDefault(require("@error/HttpError"));
function MongooseValidationError(err, req, res, next) {
    if (err.name === 'ValidationError') {
        (0, HttpError_1.default)((0, Errors_1.ValidationError)(err));
    }
    else {
        next(err);
    }
}
exports.default = MongooseValidationError;

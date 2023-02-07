"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwQuickHttpError = exports.requiredFields = exports.HTTPErrorHandler = exports.HttpError = exports.HttpErrorS = void 0;
const httpErrors_1 = require("../typesIntegrate/httpErrors");
const errTypes_1 = require("./errTypes");
exports.HttpErrorS = Symbol('HttpError');
class HttpError extends Error {
    status;
    name;
    details;
    [exports.HttpErrorS] = true;
    constructor(args) {
        super(args.message || httpErrors_1.DefaultError.message);
        this.status = args.status || httpErrors_1.DefaultError.status;
        this.name = args.name || httpErrors_1.DefaultError.name;
        this.details = args.details || httpErrors_1.DefaultError.details;
    }
}
exports.HttpError = HttpError;
function HTTPErrorHandler(err, req, res, next) {
    if (!(err instanceof HttpError))
        next(err);
    else {
        res.status(err.status).json({
            data: null,
            error: {
                status: err.status,
                message: err.message,
                name: err.name,
                details: {
                    ...err.details,
                },
            },
        });
    }
}
exports.HTTPErrorHandler = HTTPErrorHandler;
function requiredFields(object) {
    if (Object.values(object).some((e) => e === null || typeof e === 'undefined')) {
        throw (0, errTypes_1.FieldsRequired)(Object.keys(object).filter((key) => {
            const value = object[key];
            if (value === '' || value === null || typeof value === 'undefined')
                return true;
            return false;
        }));
    }
}
exports.requiredFields = requiredFields;
function throwQuickHttpError(status, message, name, details) {
    const CustomError = new HttpError({
        message,
        status,
        details,
        name: name || httpErrors_1.DefaultError.name,
    });
    throw CustomError;
}
exports.throwQuickHttpError = throwQuickHttpError;

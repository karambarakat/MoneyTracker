"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("@error/Errors");
function ServerError500(err, req, res, next) {
    console.error(err);
    res.status(Errors_1.UnknownServerError.status).json({
        status: Errors_1.UnknownServerError.status,
        message: Errors_1.UnknownServerError.message,
        name: Errors_1.UnknownServerError.message,
        details: {},
    });
}
exports.default = ServerError500;

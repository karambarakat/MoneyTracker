"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function HTTPErrorHandler(err, req, res, next) {
    if (!err.customError)
        next(err);
    else {
        // if (process.env.NODE_ENV !== 'test') console.error(err)
        res.status(err.customError.status).json({
            data: null,
            error: {
                status: err.customError.status,
                message: err.customError.message,
                name: err.customError.name,
                details: {
                    ...err.customError.details,
                },
            },
        });
    }
}
exports.default = HTTPErrorHandler;

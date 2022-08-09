"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function apiIsWorking(req, res) {
    res.status(200).json({
        message: 'api is working',
        data: null,
        error: null,
    });
}
exports.default = apiIsWorking;

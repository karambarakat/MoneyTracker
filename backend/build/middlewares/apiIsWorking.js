"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverIsWroking = void 0;
function apiIsWorking(req, res) {
    res.status(200).json({
        message: 'api is working',
        data: null,
        error: null,
    });
}
exports.default = apiIsWorking;
function serverIsWroking(req, res) {
    res.status(200).send('server is working go for /api or /api/v1');
}
exports.serverIsWroking = serverIsWroking;

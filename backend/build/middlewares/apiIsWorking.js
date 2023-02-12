"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apiIsWorking;
exports.serverIsWroking = serverIsWroking;
function apiIsWorking(req, res) {
  res.status(200).json({
    message: 'api is working',
    data: null,
    error: null
  });
}
function serverIsWroking(req, res) {
  res.status(200).send('server is working go for /api or /api/v1');
}
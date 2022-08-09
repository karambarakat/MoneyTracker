"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.express_conn = void 0;
const log_1 = __importDefault(require("@utils/log"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
async function connect() {
    (0, log_1.default)('database', 'connecting ...');
    var url = process.env.MONGO_STRING;
    await mongoose_1.default
        .connect(url)
        .then(() => (0, log_1.default)('database', 'connected'))
        .catch((err) => (0, log_1.default)('database', 'failed', err));
}
exports.express_conn = (0, express_async_handler_1.default)(async function (req, res, next) {
    await connect();
    next();
});
exports.disconnect = mongoose_1.default.disconnect;
exports.default = connect;

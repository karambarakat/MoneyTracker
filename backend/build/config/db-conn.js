"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = void 0;
const log_1 = __importDefault(require("@utils/log"));
const mongoose_1 = __importDefault(require("mongoose"));
async function connect() {
    (0, log_1.default)('database', 'connecting ...');
    var url = process.env.MONGO_STRING;
    await mongoose_1.default.connect(url).catch((err) => {
        (0, log_1.default)('database', 'failed', err);
        throw new Error('database failed to connect');
    });
    (0, log_1.default)('database', 'connected');
}
exports.disconnect = mongoose_1.default.disconnect;
exports.default = connect;

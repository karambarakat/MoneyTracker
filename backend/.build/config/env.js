"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("@utils/log"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
try {
    var envError;
    var envPath;
    switch (process.env.NODE_ENV) {
        case 'production':
            envPath = path_1.default.join(__dirname, '..', '..', '.env.prod');
            envError = dotenv_1.default.config({ path: envPath }).error;
            break;
        case 'development':
            envPath = path_1.default.join(__dirname, '..', '..', '.env.dev');
            envError = dotenv_1.default.config({ path: envPath }).error;
            break;
        case 'test':
            envPath = path_1.default.join(__dirname, '..', '..', '.env.test');
            envError = dotenv_1.default.config({ path: envPath }).error;
            break;
    }
    envPath = path_1.default.join(__dirname, '..', '..', '.env');
    const allError = dotenv_1.default.config({ path: envPath }).error;
    if (allError)
        throw allError;
    if (envError)
        throw envError;
    (0, log_1.default)('environment', `loaded for env:${process.env.NODE_ENV}`);
}
catch (e) {
    (0, log_1.default)('environment', 'loading failed');
    console.error(e);
    process.exit(1);
}
exports.default = true;

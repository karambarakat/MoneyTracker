"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("@utils/log"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
async function main() {
    var _path = path_1.default.join(__dirname, '..', '..', '.env');
    const { parsed, error } = dotenv_1.default.config({ path: _path });
    if (error)
        throw error;
    (0, log_1.default)('environment', `loaded for env:${process.env.NODE_ENV}`);
}
main().catch((e) => {
    (0, log_1.default)('environment', 'loading failed');
    console.error(e);
    process.exit(1);
});
exports.default = true;

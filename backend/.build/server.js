"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("@utils/log"));
const app_1 = __importDefault(require("./app"));
const db_conn_1 = __importDefault(require("@config/db-conn"));
/**
 * this file is used in production/development
 * in test `./app.ts` will be imported without listening on any port
 */
async function main() {
    await (0, db_conn_1.default)();
    const PORT = process.env.PORT || 8811;
    app_1.default.listen(PORT, () => (0, log_1.default)('app', `listening at port ${PORT}`));
}
main().catch(console.error);

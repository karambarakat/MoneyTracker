"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = {
    app: '\x1b[33m',
    database: '\x1b[35m',
    environment: '\x1b[36m',
};
function log(type, ...args) {
    if (process.env.NODE_ENV !== 'test')
        console.log(`${colors[type]}%s\x1b[0m`, `[${type}]`, '--', ...args);
}
exports.default = log;

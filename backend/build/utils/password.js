"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPasswords = exports.hashPassword = void 0;
const crypto_1 = __importDefault(require("crypto"));
const salt = process.env.SALT;
const hash = (string) => crypto_1.default
    .pbkdf2Sync(string, salt, 100, 64, 'sha512')
    .toString('hex');
function hashPassword(password) {
    return hash(password);
}
exports.hashPassword = hashPassword;
function matchPasswords(hashed, toMatch) {
    const toMatchHashed = hash(toMatch);
    return toMatchHashed === hashed;
}
exports.matchPasswords = matchPasswords;

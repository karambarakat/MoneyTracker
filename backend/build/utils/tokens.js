"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.generateTokenToBody = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateTokenToBody(body) {
    return jsonwebtoken_1.default.sign(body, process.env.JWT_SECRET, {
        expiresIn: '2d',
    });
}
exports.generateTokenToBody = generateTokenToBody;
function generateToken(id, email) {
    return jsonwebtoken_1.default.sign({ _id: id, email }, process.env.JWT_SECRET, {
        expiresIn: '2d',
    });
}
exports.generateToken = generateToken;

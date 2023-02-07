"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useJWT = void 0;
const User_1 = __importDefault(require("@models/User"));
const passport_jwt_1 = require("passport-jwt");
const useJWT = new passport_jwt_1.Strategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, function (payload, done) {
    User_1.default.findById(payload._id)
        .then((user) => done(null, user || false))
        .catch((error) => done(error, false));
});
exports.useJWT = useJWT;

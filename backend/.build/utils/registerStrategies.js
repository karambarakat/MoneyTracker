"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useJWT = void 0;
const passport_jwt_1 = require("passport-jwt");
const User_1 = __importDefault(require("@models/User"));
exports.useJWT = new passport_jwt_1.Strategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async function (jwt_payload, done) {
    try {
        const user = await User_1.default.findById(jwt_payload.sub);
        user ? done(null, user.withToken()) : done(null, false);
    }
    catch (error) {
        done(error, false);
    }
});

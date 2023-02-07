"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("@models/User"));
const passport_1 = __importDefault(require("passport"));
function default_1() {
    passport_1.default.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport_1.default.deserializeUser((id, done) => {
        async function main() {
            const user = await User_1.default.findById(id);
            user ? done(null, user) : done(null, false);
        }
        main().catch((e) => done(e, false));
    });
}
exports.default = default_1;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const uuid_1 = require("uuid");
const tokens_1 = require("@utils/tokens");
const UserSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        default: function () {
            return 'user-' + (0, uuid_1.v4)().split('-')[0];
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (email) {
                return /^\S+@\S+\.\S+$/.test(email);
            },
            message: 'not a valid email',
        },
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
UserSchema.methods.withToken = function () {
    delete this._doc.password;
    return {
        ...this._doc,
        token: (0, tokens_1.generateToken)(this._id),
    };
};
UserSchema.methods.matchPasswords = function (given) {
    const salt = process.env.SALT;
    const hash = crypto_1.default.pbkdf2Sync(given, salt, 100, 64, 'sha512').toString('hex');
    return hash === this.password;
};
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        next();
    else {
        const salt = process.env.SALT;
        this.password = crypto_1.default
            .pbkdf2Sync(this.password, salt, 100, 64, 'sha512')
            .toString('hex');
    }
});
UserSchema.pre('updateOne', async function (next) {
    if (!this._update.password)
        next();
    else {
        const salt = process.env.SALT;
        this._update.password = crypto_1.default
            .pbkdf2Sync(this._update.password, salt, 100, 64, 'sha512')
            .toString('hex');
    }
});
exports.default = mongoose_1.default.model('user', UserSchema);

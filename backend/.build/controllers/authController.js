"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("@error/Errors");
const HttpError_1 = __importDefault(require("@error/HttpError"));
const User_1 = __importDefault(require("@models/User"));
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = (0, express_1.Router)();
/**
 *   @desc    Register a new user
 *   @route   POST /api/v__/auth/local/register
 *   @access  Public
 */
async function local_register(req, res, next) {
    const { userName, email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (user)
        (0, HttpError_1.default)(Errors_1.UserAlreadyExist);
    const newUser = await User_1.default.create({ userName, email, password });
    res.status(201).json({ data: newUser.withToken() });
}
/**
 *   @desc    LoginExistingUser
 *   @route   POST /api/v__/auth/local/login
 *   @access  Public
 */
async function local_login(req, res, next) {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (user?.matchPasswords(password)) {
        res.json({ data: user.withToken() });
    }
    else {
        (0, HttpError_1.default)(Errors_1.EmailOrPasswordIncorrect);
    }
}
router.route('/local/register').post((0, express_async_handler_1.default)(local_register));
router.route('/local/login').post((0, express_async_handler_1.default)(local_login));
exports.default = router;

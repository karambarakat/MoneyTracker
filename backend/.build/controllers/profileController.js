"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("@error/Errors");
const HttpError_1 = __importDefault(require("@error/HttpError"));
const auth_1 = __importDefault(require("@middlewares/auth"));
const User_1 = __importDefault(require("@models/User"));
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = (0, express_1.Router)();
/**
 *   @desc    get current registered user by their JWT
 *   @route   GET /api/v__/profile
 *   @access  Private
 */
async function getCurrentUser(req, res, next) {
    res.json({ data: req.user });
}
/**
 *   @desc    get current registered user by their JWT
 *   @route   PUT /api/v__/profile
 *   @access  Private
 */
async function updateCurrentUser(req, res, next) {
    const reqUser = req.user;
    const newData = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    };
    if (Object.keys(newData).filter((key) => 
    //@ts-ignore
    newData[key]).length === 0)
        (0, HttpError_1.default)(Errors_1.EmptyBody);
    const sameEmail = await User_1.default.findOne({ email: newData.email });
    if (sameEmail &&
        sameEmail._id.toString() !== reqUser?._id.toString() &&
        sameEmail.email === newData.email) {
        (0, HttpError_1.default)(Errors_1.EmailIsUsed);
    }
    await User_1.default.updateOne(reqUser, newData, { runValidators: true });
    const newUser = await User_1.default.findById(reqUser._id);
    res.json({ data: newUser.withToken() });
}
router.route('/').get(auth_1.default, (0, express_async_handler_1.default)(getCurrentUser)).put(auth_1.default, (0, express_async_handler_1.default)(updateCurrentUser));
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
const errTypes_1 = require("@httpErrors/errTypes");
const User_1 = __importDefault(require("@models/User"));
const omitFalsy_1 = __importDefault(require("@utils/omitFalsy"));
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const local = (0, express_1.Router)();
/**
 *   @desc      Register a new user
 *   @route     POST /api/v__/auth/local/register
 *   @body      auth_local_register
 *   @response  ProfileDoc
 *   @access    Public
 */
async function local_register(req, res, next) {
    const { email, password } = BasicToken(req.header('Authorization'));
    const { displayName } = (0, omitFalsy_1.default)(req.body);
    const userExist = await User_1.default.findOne({ email });
    if (userExist)
        throw (0, errTypes_1.UserAlreadyExist)();
    const newUser = await User_1.default.create({
        displayName,
        email,
        password: password,
        providers: ['local'],
    });
    res.status(201).json({ data: newUser.doc() });
}
/**
 *   @desc      Login existing user using email and password
 *   @route     POST /api/v__/auth/local/login
 *   @body      auth_local_login
 *   @response  ProfileDoc
 *   @access    Public
 */
async function local_login(req, res, next) {
    const { email, password } = BasicToken(req.header('Authorization'));
    const user = await User_1.default.findOne({ email });
    if (user?.providers.includes('local') &&
        user?.matchPasswords(password || '')) {
        res.json({ data: user.doc() });
    }
    else {
        throw (0, errTypes_1.EmailOrPasswordIncorrect)();
    }
}
function BasicToken(req) {
    var basicToken;
    if (!(basicToken = req?.split(' ')[1]) || req?.split(' ')[0] !== 'Basic')
        throw (0, errTypes_1.BadBasicToken)();
    const [email, password] = buffer_1.Buffer.from(basicToken, 'base64')
        .toString()
        .split(':');
    if (!email || !password)
        throw (0, errTypes_1.BadBasicToken)();
    return { email, password };
}
local.route('/register').post((0, express_async_handler_1.default)(local_register));
local.route('/login').post((0, express_async_handler_1.default)(local_login));
exports.default = local;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errTypes_1 = require("@httpErrors/errTypes");
const _httpErrors_1 = require("@httpErrors");
const auth_1 = __importDefault(require("@middlewares/auth"));
const User_1 = __importDefault(require("@models/User"));
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const omitFalsy_1 = __importDefault(require("@utils/omitFalsy"));
const router = (0, express_1.Router)();
/**
 *   @desc      get current registered user by their JWT
 *   @route     GET /api/v__/profile/status
 *   @body      profile_status
 *   @response  array of all providers for given email,
 *              when empty array the user is not signed up
 *   @access    Public
 */
async function emailProvidersStatus(req, res, next) {
    const { email } = (0, omitFalsy_1.default)(req.body);
    (0, _httpErrors_1.requiredFields)({ email });
    const providers = await User_1.default.findOne({ email });
    res.json({ data: providers?.providers || [] });
}
/**
 *   @desc    get current registered user by their JWT
 *   @route   GET /api/v__/profile
 *   @access  Private
 */
async function getCurrentUser(req, res, next) {
    if (!req.user)
        throw (0, errTypes_1.PrivateRoute)();
    res.json({ data: req.user.doc() });
}
/**
 *   @desc      get current registered user by their JWT
 *   @route     PUT /api/v__/profile
 *   @body      profile_update
 *   @response  ProfileDoc
 *   @access    Private
 */
async function updateCurrentUser(req, res, next) {
    if (!req.user)
        throw (0, errTypes_1.PrivateRoute)();
    const { displayName, picture } = (0, omitFalsy_1.default)(req.body);
    req.user.displayName = displayName || req.user.displayName;
    req.user.picture = picture || req.user.picture;
    await req.user.save();
    res.json({ data: req.user.doc() });
}
/**
 *   @desc    receive old and new password and change the password in the database
 *   @route   POST /api/v__/auth/local/change_password
 *   @body      updatePassword_local or updatePassword_nolocal
 *   @response  ProfileDoc
 *   @access  Private
 */
async function updatePassword(req, res, next) {
    if (!req.user)
        throw (0, errTypes_1.PrivateRoute)();
    if (req.user.providers.includes('local')) {
        const { newPassword, oldPassword } = (0, omitFalsy_1.default)(req.body);
        (0, _httpErrors_1.requiredFields)({ newPassword, oldPassword });
        if (!req.user.matchPasswords(oldPassword))
            throw (0, errTypes_1.EmailOrPasswordIncorrect)();
        req.user.password = newPassword;
        await req.user.save();
    }
    else {
        const { newPassword } = (0, omitFalsy_1.default)(req.body);
        (0, _httpErrors_1.requiredFields)({ newPassword });
        req.user.password = newPassword;
        req.user.providers = [...req.user.providers, 'local'];
        await req.user.save();
    }
    res.json({ data: req.user.doc() });
}
router.get('/status', (0, express_async_handler_1.default)(emailProvidersStatus));
router.get('/', auth_1.default, (0, express_async_handler_1.default)(getCurrentUser));
router.put('/', auth_1.default, (0, express_async_handler_1.default)(updateCurrentUser));
router.put('/password', auth_1.default, (0, express_async_handler_1.default)(updatePassword));
exports.default = router;

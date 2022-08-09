"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@config/env");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const authController_1 = __importDefault(require("@controllers/authController"));
const profileController_1 = __importDefault(require("@controllers/profileController"));
const logController_1 = __importDefault(require("@controllers/logController"));
const categoryController_1 = __importDefault(require("@controllers/categoryController"));
const HTTPErrorHandler_1 = __importDefault(require("@error/HTTPErrorHandler"));
const apiIsWorking_1 = __importDefault(require("@middlewares/apiIsWorking"));
const E404_1 = __importDefault(require("@middlewares/E404"));
const e500_1 = __importDefault(require("@middlewares/e500"));
const passport_1 = __importDefault(require("passport"));
const registerStrategies_1 = require("@utils/registerStrategies");
const e400_1 = __importDefault(require("@middlewares/e400"));
const app = (0, express_1.default)();
passport_1.default.use(registerStrategies_1.useJWT);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
/**
 * Controllers
 */
app.get('/', apiIsWorking_1.default);
app.use('/api/v1/auth', authController_1.default);
app.use('/api/v1/profile', profileController_1.default);
app.use('/api/v1/log', logController_1.default);
app.use('/api/v1/category', categoryController_1.default);
/**
 * Errors/Handlers
 */
app.use('*', E404_1.default);
app.use(e400_1.default);
app.use(HTTPErrorHandler_1.default);
app.use(e500_1.default);
exports.default = app;

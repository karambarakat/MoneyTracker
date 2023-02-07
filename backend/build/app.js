"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@config/env");
// libraries
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// controllers
const auth_email_controller_1 = __importDefault(require("@controllers/auth.email.controller"));
const auth_google_controller_1 = __importDefault(require("@controllers/auth.google.controller"));
const profileController_1 = __importDefault(require("@controllers/profileController"));
const logController_1 = __importDefault(require("@controllers/logController"));
const categoryController_1 = __importDefault(require("@controllers/categoryController"));
const apiIsWorking_1 = __importDefault(require("@middlewares/apiIsWorking"));
const _httpErrors_1 = require("@httpErrors");
const errMiddlewares_1 = require("@httpErrors/errMiddlewares");
//passport
const passport_1 = __importDefault(require("passport"));
const local_1 = require("@passport/local");
const google_1 = require("@passport/google");
const serialize_1 = __importDefault(require("@passport/serialize"));
const JSONReplacer_1 = __importDefault(require("@utils/JSONReplacer"));
const app = (0, express_1.default)();
app.set('json replacer', JSONReplacer_1.default);
(0, serialize_1.default)();
passport_1.default.use(local_1.useJWT);
passport_1.default.use(google_1.useGoogle);
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(express_1.default.json());
app.use(errMiddlewares_1.e400_JsonError);
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
/**
 * Controllers
 */
const api = express_1.default.Router();
api.all('/', apiIsWorking_1.default);
api.use('/auth/local', auth_email_controller_1.default);
api.use('/auth/google', auth_google_controller_1.default);
api.use('/profile', profileController_1.default);
api.use('/log', logController_1.default);
api.use('/category', categoryController_1.default);
api.use('*', errMiddlewares_1.e404_ResourceNotFound);
app.use('/api/v1', api);
app.all('*', (_, res) => res.status(404).send('go to /api/v1'));
/**
 * Errors/Handlers
 */
app.use(errMiddlewares_1.e400_MongooseValidation);
app.use(_httpErrors_1.HTTPErrorHandler);
app.use(errMiddlewares_1.e500_ServerError);
exports.default = app;

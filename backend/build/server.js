"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _expressApp = _interopRequireDefault(require("./utils\\expressApp"));
var _authEmail = _interopRequireDefault(require("./controllers\\auth.email.controller"));
var _authGoogle = _interopRequireDefault(require("./controllers\\auth.google.controller"));
var _profileController = _interopRequireDefault(require("./controllers\\profileController"));
var _logController = _interopRequireDefault(require("./controllers\\logController"));
var _categoryController = _interopRequireDefault(require("./controllers\\categoryController"));
var _apiIsWorking = _interopRequireDefault(require("./middlewares\\apiIsWorking"));
var _index = require("./httpErrors\\index");
var _errMiddlewares = require("./httpErrors\\errMiddlewares");
var _passport = _interopRequireDefault(require("passport"));
var _local = require("./passport\\local");
var _google = require("./passport\\google");
var _serialize = _interopRequireDefault(require("./passport\\serialize"));
var _JSONReplacer = _interopRequireDefault(require("./utils\\JSONReplacer"));
var _doc = require("./doc");
var _log = _interopRequireDefault(require("./utils\\log"));
var _dbConn = _interopRequireDefault(require("./config\\db-conn"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// libraries

// controllers

//passport

const app = (0, _expressApp.default)();
exports.app = app;
app.set('json replacer', _JSONReplacer.default);
(0, _serialize.default)();
_passport.default.use(_local.useJWT);
_passport.default.use(_google.useGoogle);
app.use((0, _cors.default)({
  origin: 'http://localhost:3000'
}));
app.use(_express.default.json());
app.use(_errMiddlewares.e400_JsonError);
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _morgan.default)('dev'));

/**
 * Controllers
 */
const api = _express.default.Router();
api.all('/', _apiIsWorking.default);
api.use('/auth/local', _authEmail.default);
api.use('/auth/google', _authGoogle.default);
api.use('/profile', _profileController.default);
api.use('/log', _logController.default);
api.use('/category', _categoryController.default);
api.use('*', _errMiddlewares.e404_ResourceNotFound);
app.use('/api/v1', api);
app.use('/doc', _doc.doc);
app.all('*', (_, res) => res.status(404).send('go to /api/v1'));

/**
 * Errors/Handlers
 */
app.use(_errMiddlewares.e400_MongooseValidation);
app.use(_index.HTTPErrorHandler);
app.use(_errMiddlewares.e500_ServerError);
async function main() {
  await (0, _dbConn.default)();
  const PORT = process.env.PORT || 8811;
  app.listen(PORT, () => (0, _log.default)('app', `listening at port ${PORT}`));
}
if (module.id === '.') {
  main().catch(error => {
    console.error(error);
    process.exit(1);
  });
}
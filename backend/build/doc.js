"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doc = void 0;
var _redocExpress = _interopRequireDefault(require("redoc-express"));
var _express = _interopRequireDefault(require("express"));
var _log = _interopRequireDefault(require("./utils\\log"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const doc = _express.default.Router();
exports.doc = doc;
doc.use('/swagger.json', (req, res) => {
  res.sendFile('./static/swagger.json', {
    root: './src'
  });
});
doc.use('/ui', (0, _redocExpress.default)({
  title: 'API Docs',
  specUrl: '/doc/swagger.json'
}));
async function main() {
  const PORT = 8811;
  const app = (0, _express.default)();
  app.get('/', (_, res) => res.redirect('/doc/ui'));
  app.use('/doc', doc);
  app.listen(PORT, () => (0, _log.default)({
    name: 'doc',
    color: 'magenta'
  }, `listening at port ${PORT}`));
}
if (module.id === '.') {
  main().catch(error => {
    console.error(error);
    process.exit(1);
  });
}
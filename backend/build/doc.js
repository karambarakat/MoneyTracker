"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doc = void 0;
const redoc_express_1 = __importDefault(require("redoc-express"));
const express_1 = __importDefault(require("express"));
const log_1 = __importDefault(require("@utils/log"));
const doc = express_1.default.Router();
exports.doc = doc;
doc.use('/swagger.json', (req, res) => {
    res.sendFile('./static/swagger.json', { root: './src' });
});
doc.use('/ui', (0, redoc_express_1.default)({
    title: 'API Docs',
    specUrl: '/doc/swagger.json',
}));
async function main() {
    const PORT = 8811;
    const app = (0, express_1.default)();
    app.get('/', (_, res) => res.redirect('/doc/ui'));
    app.use('/doc', doc);
    app.listen(PORT, () => (0, log_1.default)({ name: 'doc', color: 'magenta' }, `listening at port ${PORT}`));
}
if (module.id === '.') {
    main().catch((error) => {
        console.error(error);
        process.exit(1);
    });
}

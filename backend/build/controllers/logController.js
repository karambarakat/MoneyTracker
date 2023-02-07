"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errTypes_1 = require("@httpErrors/errTypes");
const _httpErrors_1 = require("@httpErrors");
const auth_1 = __importDefault(require("@middlewares/auth"));
const Log_1 = __importDefault(require("@models/Log"));
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongodb_1 = require("mongodb");
const omitFalsy_1 = __importDefault(require("@utils/omitFalsy"));
const router = (0, express_1.Router)();
/**
 * @desc      get all logs
 * @route     GET /api/v__/log
 * @response  LogDoc[]
 * @access    Private
 */
async function find(req, res, next) {
    if (!req.user)
        throw (0, errTypes_1.PrivateRoute)();
    // if (!req.filterQuery) throw new Error()
    const logs = await Log_1.default.find({
        // ...req.filterQuery,
        createdBy: new mongodb_1.ObjectId(req.user._id),
    });
    res.json({ data: logs.map((e) => e.doc()) });
}
/**
 * @desc      add one log
 * @route     POST /api/v__/log
 * @body      log_create
 * @response  LogDoc
 * @access    Private
 */
async function create(req, res, next) {
    if (!req.user)
        throw (0, errTypes_1.PrivateRoute)();
    const { title, amount, category, note } = (0, omitFalsy_1.default)(req.body);
    (0, _httpErrors_1.requiredFields)({ title, amount });
    const log = await Log_1.default.create({
        title,
        amount,
        category,
        note,
        createdBy: req.user._id,
    });
    res.status(201).json({ data: log.doc() });
}
/**
 * helper functions
 */
async function findLog(req, res, next) {
    if (!req.user)
        throw (0, errTypes_1.PrivateRoute)();
    const foundLog = await Log_1.default.findOne({
        createdBy: new mongodb_1.ObjectId(req.user._id),
        _id: new mongodb_1.ObjectId(req.params.id),
    });
    if (foundLog) {
        req.log = foundLog;
        next();
    }
    else {
        throw (0, errTypes_1.ResourceWasNotFound)();
    }
}
/**
 *   @desc      get log by its id
 *   @route     GET /api/v__/log/:id
 *   @param     id of the log
 *   @response  LogDoc
 *   @access    Private, ifLogExists
 */
async function findOne(req, res, next) {
    if (!req.log)
        throw (0, errTypes_1.NoLog)();
    res.json({
        data: req.log.doc(),
    });
}
/**
 *   @desc      update log by its id
 *   @route     PUT /api/v__/log/:id
 *   @param     id of the log
 *   @body      log_update
 *   @response  LogDoc
 *   @access    Private, ifLogExists
 */
async function update(req, res, next) {
    if (!req.log)
        throw (0, errTypes_1.NoLog)();
    const { title, amount, category, note } = (0, omitFalsy_1.default)(req.body);
    req.log.title = title || req.log.title;
    req.log.amount = amount || req.log.amount;
    req.log.category = category || req.log.category;
    req.log.note = note || req.log.note;
    await req.log.save();
    res.json({ data: req.log.doc() });
}
/**
 *   @desc      delete log by its id
 *   @route     DELETE /api/v__/log/:id
 *   @param     id of the log
 *   @response  null
 *   @access    Private, ifLogExists
 */
async function delete_(req, res, next) {
    if (!req.log)
        throw (0, errTypes_1.NoLog)();
    const deleted = await Log_1.default.deleteOne({ _id: req.log._id });
    if (!deleted)
        throw (0, errTypes_1.FailedToDelete)();
    res.json({ data: null });
}
router.route('/').get(auth_1.default, (0, express_async_handler_1.default)(find));
router.route('/').post(auth_1.default, (0, express_async_handler_1.default)(create));
router.route('/:id').get(auth_1.default, (0, express_async_handler_1.default)(findLog), (0, express_async_handler_1.default)(findOne));
router.route('/:id').put(auth_1.default, (0, express_async_handler_1.default)(findLog), (0, express_async_handler_1.default)(update));
router.route('/:id').delete(auth_1.default, (0, express_async_handler_1.default)(findLog), (0, express_async_handler_1.default)(delete_));
exports.default = router;

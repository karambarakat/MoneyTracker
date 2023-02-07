"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errTypes_1 = require("@httpErrors/errTypes");
const _httpErrors_1 = require("@httpErrors");
const auth_1 = __importDefault(require("@middlewares/auth"));
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongodb_1 = require("mongodb");
const Category_1 = __importDefault(require("@models/Category"));
const Log_1 = __importDefault(require("@models/Log"));
const omitFalsy_1 = __importDefault(require("@utils/omitFalsy"));
const router = (0, express_1.Router)();
/**
 *   @desc      get all logs
 *   @route     GET /api/v__/category
 *   @response  CategoryDoc[]
 *   @access    Private
 */
async function find(req, res, next) {
    if (!req.user)
        throw (0, errTypes_1.PrivateRoute)();
    const categories = await Category_1.default.find({
        createdBy: new mongodb_1.ObjectId(req.user._id),
    });
    res.json({ data: categories.map((e) => e.doc()) });
}
/**
 *   @desc      add one log
 *   @route     POST /api/v__/category
 *   @body      category_create
 *   @response  CategoryDoc
 *   @access    Private
 */
async function create(req, res, next) {
    if (!req.user)
        throw (0, errTypes_1.PrivateRoute)();
    req.user._id;
    const { title, color, icon } = (0, omitFalsy_1.default)(req.body);
    (0, _httpErrors_1.requiredFields)({ title });
    const category = await Category_1.default.create({
        title,
        color,
        icon,
        createdBy: req.user._id,
    });
    res.status(201).json({ data: category.doc() });
}
/**
 * helper functions
 */
async function findCategory(req, res, next) {
    if (!req.user)
        throw (0, errTypes_1.PrivateRoute)();
    const found = await Category_1.default.findOne({
        createdBy: new mongodb_1.ObjectId(req.user._id),
        _id: new mongodb_1.ObjectId(req.params.id),
    });
    if (found) {
        req.category = found;
        next();
    }
    else {
        throw (0, errTypes_1.ResourceWasNotFound)();
    }
}
/**
 *   @desc      get log by its id
 *   @route     GET /api/v__/category/:id
 *   @param     id of the log
 *   @response  CategoryDoc
 *   @access    Private, ifCategoryExists
 */
async function findOne(req, res, next) {
    if (!req.category)
        throw (0, errTypes_1.NoCategory)();
    res.json({
        data: req.category.doc(),
    });
}
/**
 *   @desc      get all logs by their category id
 *   @route     GET /api/v__/category/:id
 *   @param     id of the category
 *   @response  LogDoc[]
 *   @access    Private, ifCategoryExists
 */
async function findAllLogs(req, res, next) {
    if (!req.category)
        throw (0, errTypes_1.NoCategory)();
    if (!req.user)
        throw (0, errTypes_1.PrivateRoute)();
    const logs = await Log_1.default.find({
        category: req.category._id,
        createdBy: req.user._id,
    });
    res.json({
        data: logs.map((e) => e.doc()),
    });
}
/**
 *   @desc      update log by its id
 *   @route     PUT /api/v__/category/:id
 *   @param     id of the log
 *   @body      category_update
 *   @response  CategoryDoc
 *   @access    Private, ifCategoryExists
 */
async function update(req, res, next) {
    if (!req.category)
        throw (0, errTypes_1.NoCategory)();
    const { title, color, icon } = (0, omitFalsy_1.default)(req.body);
    req.category.title = title || req.category.title;
    req.category.color = color || req.category.color;
    req.category.icon = icon || req.category.icon;
    await req.category.save();
    res.json({ data: req.category.doc() });
}
/**
 *   @desc      delete log by its id
 *   @route     DELETE /api/v__/category/:id
 *   @param     id of the log
 *   @response  null
 *   @access    Private, ifCategoryExists
 */
async function delete_(req, res, next) {
    if (!req.category)
        throw (0, errTypes_1.NoCategory)();
    const deleted = await Category_1.default.deleteOne({ _id: req.category._id });
    if (!deleted)
        throw (0, errTypes_1.FailedToDelete)();
    else
        res.json({ data: null });
}
router.route('/').get(auth_1.default, (0, express_async_handler_1.default)(find));
router.route('/').post(auth_1.default, (0, express_async_handler_1.default)(create));
router.route('/:id').get(auth_1.default, (0, express_async_handler_1.default)(findCategory), (0, express_async_handler_1.default)(findOne));
router.route('/:id').put(auth_1.default, (0, express_async_handler_1.default)(findCategory), (0, express_async_handler_1.default)(update));
router.route('/:id').delete(auth_1.default, (0, express_async_handler_1.default)(findCategory), (0, express_async_handler_1.default)(delete_));
router.route('/:id/logs').get(auth_1.default, (0, express_async_handler_1.default)(findCategory), (0, express_async_handler_1.default)(findAllLogs));
exports.default = router;

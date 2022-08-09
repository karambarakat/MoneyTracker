"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("@error/Errors");
const HttpError_1 = __importStar(require("@error/HttpError"));
const auth_1 = __importDefault(require("@middlewares/auth"));
const Category_1 = __importDefault(require("@models/Category"));
const Log_1 = __importDefault(require("@models/Log"));
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongodb_1 = require("mongodb");
const router = (0, express_1.Router)();
/**
 *   @desc    get all logs
 *   @route   GET /api/v__/category
 *   @access  Private
 */
async function find(req, res, next) {
    const reqUser = req.user;
    const categories = await Category_1.default.find({
        createdBy: new mongodb_1.ObjectId(reqUser._id),
    });
    res.json({ data: categories });
}
/**
 *   @desc    add one log
 *   @route   POST /api/v__/category
 *   @access  Private
 */
async function create(req, res, next) {
    const reqUser = req.user;
    const newData = {
        title: req.body.title,
        color: req.body.color,
        icon: req.body.icon,
        createdBy: reqUser._id,
    };
    const category = await Category_1.default.create(newData);
    res.status(201).json({ data: category });
}
/**
 *   @desc    get log by its id
 *   @route   GET /api/v__/category/:id
 *   @access  Private, ifCategoryExist
 */
async function findOne(req, res, next) {
    res.json({
        data: 
        // @ts-ignore
        req.category,
    });
}
/**
 *   @desc    get all logs that belong to specific category
 *   @route   GET /api/v__/category/:id/logs
 *   @access  Private, ifCategoryExist
 */
async function findAllLogs(req, res, next) {
    // @ts-ignore
    const reqCategory = req.category;
    const logs = await Log_1.default.find({
        category: reqCategory._id,
        createdBy: reqCategory.createdBy,
    }).select('-category');
    res.json({
        data: { ...reqCategory._doc, logs },
    });
}
/**
 *   @desc    update log by its id
 *   @route   PUT /api/v__/category/:id
 *   @access  Private, ifCategoryExist
 */
async function update(req, res, next) {
    // @ts-ignore
    const category = req.category;
    const newData = {
        title: req.body.title,
        color: req.body.color,
        icon: req.body.icon,
    };
    await Category_1.default.findOneAndUpdate({
        createdBy: new mongodb_1.ObjectId(category.createdBy),
        _id: new mongodb_1.ObjectId(category._id),
    }, newData, { runValidators: true });
    const updatedCategory = await Category_1.default.findOne({
        createdBy: new mongodb_1.ObjectId(category.createdBy),
        _id: new mongodb_1.ObjectId(category._id),
    });
    res.json({ data: updatedCategory });
}
/**
 *   @desc    delete log by its id
 *   @route   DELETE /api/v__/category/:id
 *   @access  Private, ifCategoryExist
 */
async function delete_(req, res, next) {
    // @ts-ignore
    const category = req.category;
    const deleted = await Category_1.default.deleteOne({ _id: category._id });
    if (!deleted)
        (0, HttpError_1.HttpQuickError)(400, 'failed to delete');
    else
        res.json({ data: null });
}
router.route('/').get(auth_1.default, (0, express_async_handler_1.default)(find)).post(auth_1.default, (0, express_async_handler_1.default)(create));
router
    .route('/:id')
    .get(auth_1.default, (0, express_async_handler_1.default)(findCategory), (0, express_async_handler_1.default)(findOne))
    .put(auth_1.default, (0, express_async_handler_1.default)(findCategory), (0, express_async_handler_1.default)(update))
    .delete(auth_1.default, (0, express_async_handler_1.default)(findCategory), (0, express_async_handler_1.default)(delete_));
router.route('/:id/logs').get(auth_1.default, (0, express_async_handler_1.default)(findCategory), (0, express_async_handler_1.default)(findAllLogs));
/**
 * helper functions
 */
async function findCategory(req, res, next) {
    const categoryId = req.params.id;
    const reqUser = req.user;
    const foundCategory = await Category_1.default.findOne({
        createdBy: new mongodb_1.ObjectId(reqUser._id),
        _id: new mongodb_1.ObjectId(categoryId),
    });
    if (foundCategory) {
        // @ts-ignore
        req.category = foundCategory;
        next();
    }
    else {
        (0, HttpError_1.default)(Errors_1.ResourceWasNotFound);
    }
}
exports.default = router;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _errTypes = require("./..\\httpErrors\\errTypes");
var _index = require("./..\\httpErrors\\index");
var _auth = _interopRequireDefault(require("./..\\middlewares\\auth"));
var _express = require("express");
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _mongodb = require("mongodb");
var _Category = _interopRequireDefault(require("./..\\models\\Category"));
var _Log = _interopRequireDefault(require("./..\\models\\Log"));
var _omitFalsy = _interopRequireDefault(require("./..\\utils\\omitFalsy"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();

/**
 *   @desc      get all logs
 *   @route     GET /api/v__/category
 *   @response  CategoryDoc[]
 *   @access    Private
 */
async function find(req, res, next) {
  if (!req.user) throw (0, _errTypes.PrivateRoute)();
  const categories = await _Category.default.find({
    createdBy: new _mongodb.ObjectId(req.user._id)
  });
  res.json({
    data: categories.map(e => e.doc())
  });
}

/**
 *   @desc      add one log
 *   @route     POST /api/v__/category
 *   @body      category_create
 *   @response  CategoryDoc
 *   @access    Private
 */
async function create(req, res, next) {
  if (!req.user) throw (0, _errTypes.PrivateRoute)();
  req.user._id;
  const {
    title,
    color,
    icon
  } = (0, _omitFalsy.default)(req.body);
  (0, _index.requiredFields)({
    title
  });
  const category = await _Category.default.create({
    title,
    color,
    icon,
    createdBy: req.user._id
  });
  res.status(201).json({
    data: category.doc()
  });
}

/**
 * helper functions
 */
async function findCategory(req, res, next) {
  if (!req.user) throw (0, _errTypes.PrivateRoute)();
  const found = await _Category.default.findOne({
    createdBy: new _mongodb.ObjectId(req.user._id),
    _id: new _mongodb.ObjectId(req.params.id)
  });
  if (found) {
    req.category = found;
    next();
  } else {
    throw (0, _errTypes.ResourceWasNotFound)();
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
  if (!req.category) throw (0, _errTypes.NoCategory)();
  res.json({
    data: req.category.doc()
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
  if (!req.category) throw (0, _errTypes.NoCategory)();
  if (!req.user) throw (0, _errTypes.PrivateRoute)();
  const logs = await _Log.default.find({
    category: req.category._id,
    createdBy: req.user._id
  });
  res.json({
    data: logs.map(e => e.doc())
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
  if (!req.category) throw (0, _errTypes.NoCategory)();
  const {
    title,
    color,
    icon
  } = (0, _omitFalsy.default)(req.body);
  req.category.title = title || req.category.title;
  req.category.color = color || req.category.color;
  req.category.icon = icon || req.category.icon;
  await req.category.save();
  res.json({
    data: req.category.doc()
  });
}

/**
 *   @desc      delete log by its id
 *   @route     DELETE /api/v__/category/:id
 *   @param     id of the log
 *   @response  null
 *   @access    Private, ifCategoryExists
 */
async function delete_(req, res, next) {
  if (!req.category) throw (0, _errTypes.NoCategory)();
  const deleted = await _Category.default.deleteOne({
    _id: req.category._id
  });
  if (!deleted) throw (0, _errTypes.FailedToDelete)();else res.json({
    data: null
  });
}
router.route('/').get(_auth.default, (0, _expressAsyncHandler.default)(find));
router.route('/').post(_auth.default, (0, _expressAsyncHandler.default)(create));
router.route('/:id').get(_auth.default, (0, _expressAsyncHandler.default)(findCategory), (0, _expressAsyncHandler.default)(findOne));
router.route('/:id').put(_auth.default, (0, _expressAsyncHandler.default)(findCategory), (0, _expressAsyncHandler.default)(update));
router.route('/:id').delete(_auth.default, (0, _expressAsyncHandler.default)(findCategory), (0, _expressAsyncHandler.default)(delete_));
router.route('/:id/logs').get(_auth.default, (0, _expressAsyncHandler.default)(findCategory), (0, _expressAsyncHandler.default)(findAllLogs));
var _default = router;
exports.default = _default;
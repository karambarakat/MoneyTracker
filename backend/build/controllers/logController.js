"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _errTypes = require("./..\\httpErrors\\errTypes");
var _index = require("./..\\httpErrors\\index");
var _auth = _interopRequireDefault(require("./..\\middlewares\\auth"));
var _Log = _interopRequireDefault(require("./..\\models\\Log"));
var _express = require("express");
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _mongodb = require("mongodb");
var _omitFalsy = _interopRequireDefault(require("./..\\utils\\omitFalsy"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();

/**
 * @desc      get all logs
 * @route     GET /api/v__/log
 * @response  LogDoc[]
 * @access    Private
 */
async function find(req, res, next) {
  if (!req.user) throw (0, _errTypes.PrivateRoute)();
  // if (!req.filterQuery) throw new Error()

  const logs = await _Log.default.find({
    // ...req.filterQuery,
    createdBy: new _mongodb.ObjectId(req.user._id)
  });
  res.json({
    data: logs.map(e => e.doc())
  });
}

/**
 * @desc      add one log
 * @route     POST /api/v__/log
 * @body      log_create
 * @response  LogDoc
 * @access    Private
 */
async function create(req, res, next) {
  if (!req.user) throw (0, _errTypes.PrivateRoute)();
  const {
    title,
    amount,
    category,
    note
  } = (0, _omitFalsy.default)(req.body);
  (0, _index.requiredFields)({
    title,
    amount
  });
  const log = await _Log.default.create({
    title,
    amount,
    category,
    note,
    createdBy: req.user._id
  });
  res.status(201).json({
    data: log.doc()
  });
}

/**
 * helper functions
 */
async function findLog(req, res, next) {
  if (!req.user) throw (0, _errTypes.PrivateRoute)();
  const foundLog = await _Log.default.findOne({
    createdBy: new _mongodb.ObjectId(req.user._id),
    _id: new _mongodb.ObjectId(req.params.id)
  });
  if (foundLog) {
    req.log = foundLog;
    next();
  } else {
    throw (0, _errTypes.ResourceWasNotFound)();
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
  if (!req.log) throw (0, _errTypes.NoLog)();
  res.json({
    data: req.log.doc()
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
  if (!req.log) throw (0, _errTypes.NoLog)();
  const {
    title,
    amount,
    category,
    note
  } = (0, _omitFalsy.default)(req.body);
  req.log.title = title || req.log.title;
  req.log.amount = amount || req.log.amount;
  req.log.category = category || req.log.category;
  req.log.note = note || req.log.note;
  await req.log.save();
  res.json({
    data: req.log.doc()
  });
}

/**
 *   @desc      delete log by its id
 *   @route     DELETE /api/v__/log/:id
 *   @param     id of the log
 *   @response  null
 *   @access    Private, ifLogExists
 */
async function delete_(req, res, next) {
  if (!req.log) throw (0, _errTypes.NoLog)();
  const deleted = await _Log.default.deleteOne({
    _id: req.log._id
  });
  if (!deleted) throw (0, _errTypes.FailedToDelete)();
  res.json({
    data: null
  });
}
router.route('/').get(_auth.default, (0, _expressAsyncHandler.default)(find));
router.route('/').post(_auth.default, (0, _expressAsyncHandler.default)(create));
router.route('/:id').get(_auth.default, (0, _expressAsyncHandler.default)(findLog), (0, _expressAsyncHandler.default)(findOne));
router.route('/:id').put(_auth.default, (0, _expressAsyncHandler.default)(findLog), (0, _expressAsyncHandler.default)(update));
router.route('/:id').delete(_auth.default, (0, _expressAsyncHandler.default)(findLog), (0, _expressAsyncHandler.default)(delete_));
var _default = router;
exports.default = _default;
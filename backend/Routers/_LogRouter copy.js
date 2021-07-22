const mongoose = require("mongoose");
const express = require("express");
const protect = require("../Middlewares/authMiddleware");
const asyncHF = require("express-async-handler");
const router = express.Router();
const User = mongoose.model("users");

/**
 * @desc    Get all logs for given user
 * @route   GET   /api/log          */
const getAllLogs = asyncHF(async (req, res, next) => {
  logs = req.user.logs;
  if (logs.length === 0) {
    res.status(204);
    res.json({ msg: "empty resource" });
  } else {
    res.json(req.user.logs);
  }
});

/**
 * @desc    All one new log
 * @route   POST   /api/log          */
const AddLog = asyncHF(async (req, res, next) => {
  const { title, note, amount, category } = req.body;
  const i = await req.user.logs.push({ title, note, amount, category });
  await req.user.save();
  res.json(req.user.logs[i - 1]);
});

/**
 * @desc    delete all logs for a given user
 * @route   DELETE   /api/log          */
const deleteAllLogs = asyncHF(async (req, res, next) => {
  try {
    req.user.logs = [];
    await req.user.save();
    res.json({ msg: "successful removing" });
  } catch {
    throw new Error();
  }
});

/**
 *          /api/log/:id
 */

/**
 * @desc    get one log
 * @route   GET   /api/log/:id       */
const getLog = async (req, res, next) => {
  const { id } = req.params;
  const log = req.user.getLog(id);

  if (!log) {
    res.status(404);
    res.json({ msg: "not found" });
  }
  res.json(log);
};

/**
 * @desc    update one given log
 * @route   PUT   /api/log/:id       */
const EditLog = asyncHF(async (req, res, next) => {
  const { id } = req.params;
  const { title, amount, note, category } = req.body;
  const log = req.user.getLog(id);

  if (!log) {
    res.status(404);
    res.json({ msg: "not found" });
  }

  const updated = log.update({ title, amount, note, category });
  await req.user.save();
  res.json(updated);
});

/**
 * @desc    delete one given log
 * @route   DELETE   /api/log/:id       */
const deleteLog = asyncHF(async (req, res, next) => {
  const { id } = req.params;
  const log = req.user.getLog(id);

  if (!log) {
    res.status(404);
    res.json({ msg: "not found" });
  }

  log.remove();
  await req.user.save();
  res.json({ msg: "successful removing" });
});

// Road Map
// @route     /api/log
router
  .route("/")
  .all(protect)
  .get(getAllLogs)
  .post(AddLog)
  .delete(deleteAllLogs);
router.route("/:id").all(protect).get(getLog).put(EditLog).delete(deleteLog);

module.exports = router;

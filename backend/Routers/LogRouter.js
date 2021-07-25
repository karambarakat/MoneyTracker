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
  const available = req.user.logs.filter((log) => !log.markedForDeletion);
  if (available.length === 0) {
    res.status(204);
    res.json({ msg: "empty resource" });
  } else {
    res.json(available.map((e) => e.getJson()));
  }
});

/**
 * @desc    All one new log
 * @route   POST   /api/log          */
const AddLog = asyncHF(async (req, res, next) => {
  const { title, note, amount, category } = req.body;

  const i = await req.user.logs.push({ title, note, amount, category });
  await req.user.save();
  res.json(req.user.logs[i - 1].getJson());
});

/**
 * @desc    delete all logs for a given user
 * @route   DELETE   /api/log          */
const deleteAllLogs = asyncHF(async (req, res, next) => {
  req.user.logs.forEach((log) => (log.markedForDeletion = true));
  await req.user.save();
  res.json({ msg: "successful removing" });

  setTimeout(() => {
    deleteCategoryForUser(
      req.user.logs.map((log) => String(log._id)),
      String(req.user._id)
    );
  }, 7000);
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

  if (!log || log.markedForDeletion) {
    res.error(404, "not found");
  } else {
    res.json(log.getJson());
  }
};

/**
 * @desc    update one given log
 * @route   PUT   /api/log/:id       */
const EditLog = asyncHF(async (req, res, next) => {
  const { id } = req.params;
  const { title, amount, note, category } = req.body;
  const log = req.user.getLog(id);

  if (!log) res.error(404, "not found");

  const updated = log.update({ title, amount, note, category });
  await req.user.save();
  res.json(updated.getJson());
});

/**
 * @desc    delete one given log
 * @route   DELETE   /api/log/:id       */
const deleteLog = asyncHF(async (req, res, next) => {
  const { id } = req.params;
  const log = req.user.getLog(id);

  if (!log) {
    res.error(404, "not found");
  }

  log.markedForDeletion = true;
  await req.user.save();
  res.json({ msg: "successful removing" });

  setTimeout(() => {
    deleteCategoryForUser([id], String(req.user._id));
  }, 7000);
});

const deleteCategoryForUser = async (ids, userId) => {
  try {
    const user = await User.findById(userId).select("-password");
    ids.forEach((id) => {
      const log = user && user.getLog(id);

      if (log && log.markedForDeletion) {
        log.remove();
      }
    });
    await user.save();
  } catch (error) {
    console.error(error);
  }
};

/**
 * @desc    delete one given log
 * @route   DELETE   /api/category/:id?revert=true       */
const revertDeletion = asyncHF(async (req, res, next) => {
  const { revert } = req.query;
  if (!revert) next();
  else {
    const { id } = req.params;
    const log = req.user.getLog(id);
    log.markedForDeletion = false;
    await req.user.save();

    res.json(log);
  }
});

const validCat = (mode) =>
  asyncHF(async (req, res, next) => {
    const { id } = req.params;
    const { category } = req.body;

    // mimic the mongoose validation error
    const throw400 = () => {
      res.error(400, "category validation failed", {
        errorsList: [
          {
            error: "category",
            message: "this category doesn't exist",
          },
        ],
      });
    };

    if (mode === "put") {
      const log = req.user.getLog(id);
      if (!log) res.error(404, "not found");
      //if the categoyr it is not valid => throw 400 bad request
      //if the log is not categorized and user try to update it they have to provide a correct cat
      if (!log.category && !req.user.validCategory(category)) throw400();
    }
    // ifesle (mode === post)
    else {
      //if there in no category with the same id throw 400 bad request
      if (!req.user.validCategory(category)) throw400();
    }

    next();
  });

// Road Map
// @route     /api/log
router
  .route("/")
  .all(protect)
  .get(getAllLogs)
  .post(validCat("post"), AddLog)
  .delete(deleteAllLogs); //setTimeout
router
  .route("/:id")
  .all(protect)
  .get(getLog)
  .put(validCat("put"), EditLog)
  .delete(revertDeletion, deleteLog); //setTimeout

module.exports = router;

const express = require("express");
const protect = require("../Middlewares/authMiddleware");
const asyncHF = require("express-async-handler");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("users");

/**
 * @desc    Get all logs for given user
 * @route   GET   /api/category          */
const getAllCategories = asyncHF(async (req, res, next) => {
  if (req.user.categories.length === 0) {
    res.status(204);
    res.json({ msg: "empty resource" });
  } else {
    res.json(req.user.categories);
  }
});

/**
 * @desc    one new log
 * @route   POST   /api/category          */
const AddCategory = asyncHF(async (req, res, next) => {
  const { title, color, icon } = req.body;
  const i = await req.user.categories.push({ title, color, icon }); //return the length of the new categories array
  await req.user.save();
  res.json(req.user.categories[i - 1]);
});

/**
 * @desc    delete all logs for a given user
 * @route   DELETE   /api/category          */
const deleteAllCateories = asyncHF(async (req, res, next) => {
  cleanAllLogs(
    req.user.logs,
    req.user.categories.map((cat) => String(cat._id))
  );

  req.user.categories = [];

  await req.user.save();
  res.json({ msg: "successful removing" });
});

/**
 *          /api/category/:id
 */

/**
 * @desc    get one log
 * @route   GET   /api/category/:id       */
const getCategory = asyncHF(async (req, res, next) => {
  const { id } = req.params;
  const category = req.user.getCategory(id);

  if (!category) {
    res.error(404, "not found");
  }
  res.json(category);
});

/**
 * @desc    update one given log
 * @route   PUT   /api/category/:id       */
const EditCategory = asyncHF(async (req, res, next) => {
  const { id } = req.params;
  const { title, color, icon } = req.body;

  const category = req.user.getCategory(id);
  if (!category) {
    res.error(404, "not found");
  }

  const updated = category.update({ title, color, icon });
  await req.user.save();
  res.json(updated);
});

// todo: change all logs that have this category id to default
/**
 * @desc    delete one given log
 * @route   DELETE   /api/category/:id       */
const deleteCategory = asyncHF(async (req, res, next) => {
  const { id } = req.params;
  const category = req.user.getCategory(id);

  if (!category) {
    res.error(404, "not found");
  }

  cleanAllLogs(req.user.logs, [id]);

  category.remove();
  await req.user.save();
  res.json({ msg: "successful removing" });
});

const cleanAllLogs = (logs, catIds) => {
  logs.forEach((log) => {
    // if (String(log.category._id) === catIds) {
    if (catIds.some((catId) => catId === String(log.category._id))) {
      log.category = undefined;
    }
  });
};

// Road Map
// @route     /api/category
router
  .route("/")
  .all(protect)
  .get(getAllCategories)
  .post(AddCategory)
  .delete(deleteAllCateories); //cleanAllLogs
router
  .route("/:id")
  .all(protect)
  .get(getCategory)
  .put(EditCategory)
  .delete(deleteCategory); //cleanAllLogs

module.exports = router;

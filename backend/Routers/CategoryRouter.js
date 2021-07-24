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
  const available = req.user.categories.filter((cat) => !cat.markedForDeletion);

  if (available.length === 0) {
    res.status(204);
    res.json({ msg: "empty resource" });
  } else {
    res.json(available);
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
  req.user.categories.forEach((cat) => (cat.markedForDeletion = true));
  await req.user.save();
  res.json({ msg: "successful removing" });

  setTimeout(() => {
    deleteCategoryForUser(
      req.user.categories.map((cat) => String(cat._id)),
      String(req.user._id)
    );
  }, 7000);
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

  if (!category) res.error(404, "not found");

  if (category.markedForDeletion) res.error(404, "not found");

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

/**
 * @desc    delete one given log
 * @route   DELETE   /api/category/:id       */
const deleteCategory = asyncHF(async (req, res, next) => {
  const { id } = req.params;
  const category = req.user.getCategory(id);

  if (!category) {
    res.error(404, "not found");
  }

  category.markedForDeletion = true;
  await req.user.save();
  res.json({ msg: "successful removing" });

  setTimeout(() => {
    deleteCategoryForUser([id], String(req.user._id));
  }, 7000);
});

/**
 * @desc    delete one given log
 * @route   DELETE   /api/category/:id?revert=true       */
const revertDeletion = asyncHF(async (req, res, next) => {
  const { revert } = req.query;
  if (!revert) next();
  else {
    const { id } = req.params;
    const category = req.user.getCategory(id);
    category.markedForDeletion = false;
    await req.user.save();

    res.json(category);
  }
});

const deleteCategoryForUser = async (ids, userId) => {
  const user = await User.findById(userId).select("-password");
  ids.forEach((id) => {
    const category = user.getCategory(id);
    if (category.markedForDeletion) {
      category.remove();
      cleanAllLogs(user.logs, [id]);
    }
  });
  await user.save();
};

const cleanAllLogs = (logs, catIds) => {
  logs.forEach((log) => {
    if (catIds.some((catId) => catId === String(log.category))) {
      log.category = undefined;
    }
  });
};

// Road Map
// @route     /api/category
router
  .route("/")
  .all(protect)
  .get(getAllCategories) //filter()
  .post(AddCategory)
  .delete(deleteAllCateories); //cleanAllLogs() //delayDeletion()
router
  .route("/:id")
  .all(protect)
  .get(getCategory) //filter()
  .put(EditCategory)
  .delete(revertDeletion, deleteCategory); //cleanAllLogs() //delayDeletion()

module.exports = router;

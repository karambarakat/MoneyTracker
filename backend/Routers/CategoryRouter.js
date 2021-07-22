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
  categories = req.user.categories;
  if (categories.length === 0) {
    res.status(204);
    res.json({ msg: "empty resource" });
  } else {
    req.user.categories.shift(); // don't show first item 'uncategorized'
    res.json(req.user.categories);
  }
});

/**
 * @desc    All one new log
 * @route   POST   /api/category          */
const AddCategory = asyncHF(async (req, res, next) => {
  const { title, color, icon } = req.body;
  const i = await req.user.categories.push({ title, color, icon });
  await req.user.save();
  res.json(req.user.categories[i - 1]);
});

/**
 * @desc    delete all logs for a given user
 * @route   DELETE   /api/category          */
const deleteAllCateories = asyncHF(async (req, res, next) => {
  try {
    const firstCat = req.user.categories[0];
    req.user.categories = [];
    req.user.categories.push(firstCat); // keep only the first 'uncategorized' category
    await req.user.save();
    res.json({ msg: "successful removing" });
  } catch {
    throw new Error();
  }
});

/**
 *          /api/category/:id
 */

/**
 * @desc    get one log
 * @route   GET   /api/category/:id       */
const getCategory = async (req, res, next) => {
  const { id } = req.params;
  const category = req.user.getCategory(id);

  if (!category) {
    res.status(404);
    res.json({ msg: "not found" });
  }
  res.json(category);
};

/**
 * @desc    update one given log
 * @route   PUT   /api/category/:id       */
const EditCategory = asyncHF(async (req, res, next) => {
  const { id } = req.params;
  const { title, color, icon } = req.body;
  const category = req.user.getCategory(id);
  if (!category) {
    res.status(404);
    res.json({ msg: "not found" });
  }

  if (id === String(req.user.categories[0]._id)) {
    res.status(401);
    throw new Error(
      "nice try you are not allowed to edit or delete this category"
    );
  }

  // todo: bug detected when there is a typo in here and I request this route
  // it will give me 200Ok response msg:category_typohere is not defined
  // suppose to give me 500 error
  // if (category_typohere._id === req.user.categories[0]._id) {
  //   console.log("got it");
  // }

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
    res.status(404);
    res.json({ msg: "not found" });
  }

  if (id === String(req.user.categories[0]._id)) {
    res.status(401);
    throw new Error(
      "nice try you are not allowed to edit or delete this category"
    );
  }

  // change all log that have this cat as thier category
  // change them to have the first category 'uncategorized' as their category
  req.user.logs.forEach((e) => {
    if (e.category._id === id) {
      e.update({ category: String(req.user.categories[0]._id) });
    }
  });

  category.remove();
  await req.user.save();
  res.json({ msg: "successful removing" });
});

// Road Map
// @route     /api/category
router
  .route("/")
  .all(protect)
  .get(getAllCategories)
  .post(AddCategory)
  .delete(deleteAllCateories);
router
  .route("/:id")
  .all(protect)
  .get(getCategory)
  .put(EditCategory)
  .delete(deleteCategory);

module.exports = router;

const router = require("express").Router();
const User = require("../models/User");
const asyncHF = require("express-async-handler");
const protect = require("../Middlewares/authMiddleware");
const { reset } = require("nodemon");

/**
 *   @desc    Register a new user
 *   @route   POST /api/user
 *   @access  Public*/
const registerUser = asyncHF(async (req, res, next) => {
  const { userName, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const userNew = await User.create({ userName, email, password });

  res.status(201).json(userNew.leanScope());
});

/**
 * @desc    login with user and password
 * @route   POST /api/user/login
 * @access  Public*/
const authUser = asyncHF(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.matchPassword(password)) {
    res.json(user.leanScope());
  } else {
    res.status(401);
    throw new Error("The email or password is incorrect");
  }
});

/**
 * @desc    Get information about this user
 * @route   GET /api/user/profile
 * @access  Private*/
const getUserProfile = asyncHF(async (req, res, next) => {
  res.json(req.user.leanScope());
});

/**
 * @desc    Update the porfile of this user
 * @route   PUT /api/user/profile
 * @access  Private*/
const updateUserProfile = asyncHF(async (req, res, next) => {
  req.user.userName = req.body.userName || req.user.userName;
  req.user.email = req.body.email || req.user.email;
  if (req.body.password) {
    req.user.password = req.body.password;
  }

  const updateUser = await req.user.save();
  res.json(updateUser.leanScope());
});

/**
 * Roadmap
 * @router  /api/user     */
router.route("/").post(registerUser);
router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;

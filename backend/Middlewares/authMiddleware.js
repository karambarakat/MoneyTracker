const asyncHF = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = asyncHF(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (process.env.ENV === "development") {
        // console.log("\x1b[36m", decoded.id, "\x1b[0m", req.user.userName);
      }

      if (!req.user) throw new Error();

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized no token");
  }
});

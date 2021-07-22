const router = require("express").Router();
const EAH = require("express-async-handler");
const Meta = require("../Models/Meta");
const userExist = require("../Middlewares/authMiddleware");
const protect = [
  userExist,
  (req, res, next) => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error("this user is not an admin");
    }
  },
];
router
  .route("/")
  .get(
    EAH(async (req, res) => {
      const data = await Meta.find();
      res.json(data);
    })
  )
  .post(
    protect,
    EAH(async (req, res) => {
      const { color, icon } = req.body;
      const doc = await Meta.findById("60f3c775eeaa5823c00c4f71");
      color && doc.colors.push(...color);
      icon && doc.icons.push(...icon);
      await doc.save();
      res.json(doc);
    })
  )
  .put(
    protect,
    EAH(async (req, res) => {
      const { color, icon } = req.body;
      const doc = await Meta.findById("60f3c775eeaa5823c00c4f71");
      doc.colors = color ? color : [];
      doc.icons = icon ? icon : [];
      await doc.save();
      res.json(doc);
    })
  )
  .delete(
    protect,
    EAH(async (req, res) => {
      const doc = await Meta.findById("60f3c775eeaa5823c00c4f71");
      doc.colors = [];
      doc.icons = [];
      await doc.save();
      res.json(doc);
    })
  );

router
  .route("/colors")
  .get(
    EAH(async (req, res) => {
      const { colors } = await Meta.find();
      res.json(colors);
    })
  )
  .post(
    protect,
    EAH(async (req, res) => {
      const { color } = req.body;
      const doc = await Meta.findById("60f3c775eeaa5823c00c4f71");
      doc.colors.push(color);
      await doc.save();
      res.json(doc);
    })
  );

router
  .route("/icons")
  .get(
    EAH(async (req, res) => {
      const { icons } = await Meta.find();
      res.json(icons);
    })
  )
  .post(
    protect,
    EAH(async (req, res) => {
      const { icon } = req.body;
      const doc = await Meta.findById("60f3c775eeaa5823c00c4f71");
      doc.icons.push(icon);
      await doc.save();
      res.json(doc);
    })
  );

module.exports = router;

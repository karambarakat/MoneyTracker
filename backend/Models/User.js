var CategorySchema = require("./CategorySchema");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { generateToken } = require("../Utils/Tokens");
const LogSchema = require("./LogSchema");
// crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      default: function () {
        return `User-${crypto
          .createHash("sha256")
          .update(this.email)
          .digest("hex")
          .substr(0, 10)
          .toUpperCase()}`;
      },
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    logs: [LogSchema],
    categories: [CategorySchema],
    isAdmin: Boolean,
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.getLog = function (id) {
  const log = this.logs.find((e) => e._id == id);
  return log;
};

UserSchema.methods.getCategory = function (id) {
  return this.categories.find((e) => e._id == id);
};

UserSchema.methods.matchPassword = function (enteredPassword) {
  const salt = process.env.SALT;
  const hashedEntered = crypto
    .pbkdf2Sync(enteredPassword, salt, 100, 64, "sha512")
    .toString("hex");
  return hashedEntered === this.password;
};

UserSchema.methods.leanScope = function () {
  return {
    _id: this._id,
    userName: this.userName,
    email: this.email,
    token: generateToken(this._id),
  };
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = process.env.SALT;
  this.password = crypto
    .pbkdf2Sync(this.password, salt, 100, 64, "sha512")
    .toString("hex");
});

module.exports = mongoose.model("users", UserSchema);

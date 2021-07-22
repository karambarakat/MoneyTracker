var CategorySchema = require("./CategorySchema");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { generateToken } = require("../Utils/Tokens");
const LogSchema = require("./LogSchema");
// crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
const color = require("color");
const Schema = mongoose.Schema;

const MetaSchema = new Schema({
  colors: [String],
  icons: [String],
});

//genrate all difrent colors
const each = (cb) => color.rgb(eArr.map(cb)).hex();
MetaSchema.pre("save", async function (next) {
  if (!this.isModified("colors")) next();
  this.colors = this.colors.map((e) => {
    e = color(`#${e}`);
    eArr = e.rgb().array();

    return {
      tint80: each((chnl) => chnl + (255 - chnl) * 0.8),
      tint40: each((chnl) => chnl + (255 - chnl) * 0.4),
      tint20: each((chnl) => chnl + (255 - chnl) * 0.2),
      shade30: each((chnl) => chnl * 0.7),
      shade60: each((chnl) => chnl * 0.4),
      base: e.hex(),
      className: `category-color-${e.hex().substring(1)}`,
    };
  });
});

module.exports = mongoose.model("meta", MetaSchema);

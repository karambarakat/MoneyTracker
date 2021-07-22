const mongoose = require("mongoose");

const LogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    //todo: what if the category has benn deleted!!
    category: {
      type: mongoose.Types.ObjectId,
      validate: {
        validator: function () {
          const ref = String(this.category);
          return this.parent().categories.some((e) => e._id == ref);
        },
        message: "the category doesn't exist",
      },
      required: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

LogSchema.methods.update = function ({ title, amount, note, category }) {
  if (title) this.title = title;
  if (amount) this.amount = amount;
  if (note) this.note = note;
  if (category) this.category = category;
  return this;
};

LogSchema.methods.getJson = function () {
  const json = this.toJSON();
  const ref = String(this.category._id);
  json.category = this.parent().getCategory(ref) || ref;
  return json;
};

module.exports = LogSchema;

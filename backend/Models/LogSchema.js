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
    },
    note: {
      type: String,
    },
    markedForDeletion: {
      type: Boolean,
      default: false,
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

  //populate the category or just pass uncategorized category
  try {
    const ref = String(this.category._id);
    json.category = this.parent().getCategory(ref) || ref;
    if (!json.category) throw new error();
  } catch {
    json.category = { title: "uncategorized", color: "6074ff", icon: "Error" };
  }

  return json;
};

module.exports = LogSchema;

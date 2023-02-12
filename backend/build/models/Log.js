"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _Category = _interopRequireDefault(require("./Category"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LogSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  createdBy: {
    type: _mongoose.default.Types.ObjectId,
    required: true
  },
  category: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'category'
  },
  note: {
    type: String
  }
}, {
  timestamps: true
});

/**
 * relation with category (validation)
 */
LogSchema.pre('save', async function (next) {
  if (!this.category) next();
  const category = await _Category.default.findOne({
    _id: this.category,
    createdBy: this.createdBy
  });
  if (!category) {
    const error = new Error("category doesn't exists");
    error.name = 'ValidationError';
    // @ts-ignore
    error.errors = {
      category: {
        name: 'relationError',
        message: "category doesn't exists"
      }
    };
    next(error);
  } else {
    next();
  }
});
LogSchema.pre('findOneAndUpdate', async function (next) {
  // @ts-ignore
  const toUpdateTo = this._update.category;
  if (!toUpdateTo) next();else {
    const thisDoc = await this.model.findOne(
    // @ts-ignore
    {
      _id: this._conditions._id
    });
    const category = await _Category.default.findOne({
      _id: toUpdateTo,
      createdBy: thisDoc.createdBy
    });
    if (!category) {
      const error = new Error("category doesn't exists");
      error.name = 'ValidationError';
      // @ts-ignore
      error.errors = {
        category: {
          name: 'relationError',
          message: "category doesn't exists"
        }
      };
      next(error);
    } else {
      next();
    }
  }
});

/**
 * auto populate
 */
LogSchema.post('save', async function (doc, next) {
  await doc.populate('category', '-logs -createdBy -__v');
  next();
});
LogSchema.post('find', async function (docs, next) {
  if (!docs) next();
  for (let doc of docs) {
    if (doc.category) {
      await doc.populate('category', '-logs -createdBy -__v');
    } else {
      doc.category = undefined;
    }
  }
  next();
});
LogSchema.post('findOne', async function (doc, next) {
  if (!doc) next();
  if (doc.category) {
    await doc.populate('category', '-logs -createdBy -__v');
  } else {
    doc.category = undefined;
  }
  next();
});
LogSchema.methods.doc = function () {
  return this._doc;
};
var _default = _mongoose.default.model('log', LogSchema);
exports.default = _default;
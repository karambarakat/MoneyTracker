import mongoose from 'mongoose'
import Category from './Category'
import { Log } from 'types/src/schema'

export interface ILog extends Log {
  doc: () => Omit<ILog, 'doc'>
}

const LogSchema = new mongoose.Schema<ILog>(
  {
    title: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category'
    },
    note: {
      type: String
    }
  },
  { timestamps: true }
)

/**
 * relation with category (validation)
 */
LogSchema.pre('save', async function (this, next) {
  if (!this.category) next()

  const category = await Category.findOne({
    _id: this.category,
    createdBy: this.createdBy
  })

  if (!category) {
    const error = new Error("category doesn't exists")
    error.name = 'ValidationError'
    // @ts-ignore
    error.errors = {
      category: {
        name: 'relationError',
        message: "category doesn't exists"
      }
    }
    next(error)
  } else {
    next()
  }
})

LogSchema.pre('findOneAndUpdate', async function (this, next) {
  // @ts-ignore
  const toUpdateTo = this._update.category
  if (!toUpdateTo) next()
  else {
    const thisDoc = await this.model.findOne(
      // @ts-ignore
      { _id: this._conditions._id }
    )

    const category = await Category.findOne({
      _id: toUpdateTo,
      createdBy: thisDoc.createdBy
    })

    if (!category) {
      const error = new Error("category doesn't exists")
      error.name = 'ValidationError'
      // @ts-ignore
      error.errors = {
        category: {
          name: 'relationError',
          message: "category doesn't exists"
        }
      }
      next(error)
    } else {
      next()
    }
  }
})

/**
 * auto populate
 */
LogSchema.post('save', async function (doc, next) {
  await doc.populate('category', '-logs -createdBy -__v')
  next()
})

LogSchema.post('find', async function (docs, next) {
  if (!docs) next()

  for (const doc of docs) {
    if (doc.category) {
      await doc.populate('category', '-logs -createdBy -__v')
    } else {
      doc.category = undefined
    }
  }

  next()
})
LogSchema.post('findOne', async function (doc, next) {
  if (!doc) next()

  if (doc.category) {
    await doc.populate('category', '-logs -createdBy -__v')
  } else {
    doc.category = undefined
  }

  next()
})

LogSchema.methods.doc = function () {
  return this._doc
}

export default mongoose.model('log', LogSchema)

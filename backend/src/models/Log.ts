import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import Category from './Category'

export interface LogInterface {
  _id?: string
  title: string
  amount: string
  createdBy?: ObjectId | string
  category?: object
  note?: string

  createdAt?: string | Date
  updatedAt?: string | Date
}

const LogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
)

/**
 * relation with category (validation)
 */
LogSchema.pre('save', async function (next) {
  if (!this.category) next()

  const category = await Category.findOne({
    _id: this.category,
    createdBy: this.createdBy,
  })

  if (!category) {
    const error = new Error("category doesn't exists")
    error.name = 'ValidationError'
    // @ts-ignore
    error.errors = {
      category: { name: 'relationError', message: "category doesn't exists" },
    }
    next(error)
  } else {
    next()
  }
})
LogSchema.pre('findOneAndUpdate', async function (next) {
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
      createdBy: thisDoc.createdBy,
    })

    if (!category) {
      const error = new Error("category doesn't exists")
      error.name = 'ValidationError'
      // @ts-ignore
      error.errors = {
        category: { name: 'relationError', message: "category doesn't exists" },
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
  await doc.populate('category', '-logs -createdBy')
  next()
})

LogSchema.post('find', async function (docs, next) {
  if (!docs) next()

  for (let doc of docs) {
    if (doc.category) {
      await doc.populate('category', '-logs -createdBy')
    } else {
      doc.category = null
    }
  }

  next()
})
LogSchema.post('findOne', async function (doc, next) {
  if (!doc) next()

  if (doc.category) {
    await doc.populate('category', '-logs -createdBy')
  } else {
    doc.category = null
  }

  next()
})

export default mongoose.model('log', LogSchema)

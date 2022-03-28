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
// ? to delete: relation with category, second thought?
/**
 * relation with category
 * (validation and update category)
 */

// LogSchema.pre('save', async function (next) {
//   if (!this.category) next()

//   const category = await Category.findOne(
//     {
//       _id: this.category,
//       createdBy: this.createdBy,
//     },
//     { $push: { logs: this._id.toString() } },
//     { new: true, useFindAndModify: false }
//   )

//   if (!category) {
//     const error = new Error("category doesn't exists")
//     error.name = 'ValidationError'
//     // @ts-ignore
//     error.errors = {
//       category: { name: 'relationError', message: "category doesn't exists" },
//     }
//     next(error)
//   }

//   next()
// })
// LogSchema.pre('findOneAndUpdate', async function (next) {
//   // @ts-ignore
//   if (!this._update.category) next()
//   else {
//     const thisDoc = await this.model.findOne(
//       // @ts-ignore
//       { _id: this._conditions._id }
//     )
//     // console.log(thisDoc)
//     await Promise.all([
//       Category.findOneAndUpdate(
//         {
//           //@ts-ignore
//           _id: this._update.category,
//         },
//         { $push: { logs: thisDoc._id.toString() } },
//         { new: true, useFindAndModify: false }
//       ),
//       thisDoc.category &&
//         Category.findOneAndUpdate(
//           {
//             //@ts-ignore
//             _id: thisDoc.category._id,
//           },
//           { $pull: { logs: thisDoc._id.toString() } },
//           { new: true, useFindAndModify: false }
//         ),
//     ])
//       .catch((e) => next(e))
//       .then(() => next())
//   }
// })
// LogSchema.pre('deleteOne', async function (next) {
//   const toDeleteId = this._conditions._id
//   const toDelete = await this.model.findOne({ _id: toDeleteId })

//   if (!toDelete.category) {
//     next()
//   } else {
//     await Category.findOneAndUpdate(
//       {
//         _id: toDelete.category,
//         createdBy: toDelete.createdBy,
//       },
//       { $pull: { logs: toDelete._id.toString() } },
//       { new: true, useFindAndModify: false }
//     )
//     next()
//   }
// })

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
    if (!doc) continue

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

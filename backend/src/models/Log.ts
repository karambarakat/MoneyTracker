import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

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

LogSchema.post('save', async function (doc, next) {
  await doc.populate('category')
  next()
})

LogSchema.post('find', async function (docs) {
  for (let doc of docs) {
    if (doc.category) {
      await doc.populate('category')
    } else {
      doc.category = null
    }
  }
})

LogSchema.post('findOne', async function (doc) {
  if (doc.category) {
    await doc.populate('category')
  } else {
    doc.category = null
  }
})

export default mongoose.model('log', LogSchema)

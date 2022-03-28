import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

export interface CategoryInterface {
  _id?: string
  title: string
  color: string
  icon: string
  createdBy?: ObjectId | string

  createdAt?: string | Date
  updatedAt?: string | Date
}

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    validate: {
      validator: function (v: string) {
        return typeof v === 'string' && /^#[\dabcdef]{6}$/.test(v)
      },
      message: (props: any) => `${props.value} is not hex color`,
    },
  },
  icon: { type: String },
  logs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'log',
    },
  ],
  createdBy: { type: mongoose.Types.ObjectId },
})

CategorySchema.post('save', async function (doc, next) {
  await doc.populate('logs')
  next()
})

CategorySchema.post('find', async function (docs) {
  for (let doc of docs) {
    if (doc.logs) {
      await doc.populate('logs')
    } else {
      doc.logs = null
    }
  }
})

export default mongoose.model('category', CategorySchema)

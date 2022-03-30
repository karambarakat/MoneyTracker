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
  createdBy: { type: mongoose.Types.ObjectId },
})

export default mongoose.model('category', CategorySchema)

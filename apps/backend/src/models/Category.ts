import mongoose from 'mongoose'
import { Category } from 'types/schema'

export interface ICategory extends Category {
  doc: () => Omit<ICategory, 'doc'>
}

const CategorySchema = new mongoose.Schema<ICategory>({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  icon: { type: String },
  createdBy: { type: mongoose.Types.ObjectId }
})

CategorySchema.methods.doc = function () {
  return this._doc
}

export default mongoose.model('category', CategorySchema)

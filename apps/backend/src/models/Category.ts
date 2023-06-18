import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import type { SchemaCategoryOut } from 'types/dist/schema'
import { Override } from 'types/utils/Override'

type Override_ = Override<SchemaCategoryOut, { createdBy: ObjectId }>

export interface ICategory extends Override_ {
  doc: () => Omit<ICategory, 'doc'>
}

const CategorySchema = new mongoose.Schema<ICategory>({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  icon: { type: String },
  createdBy: { type: mongoose.Types.ObjectId },
})

CategorySchema.methods.doc = function () {
  return this._doc
}

export default mongoose.model('category', CategorySchema)

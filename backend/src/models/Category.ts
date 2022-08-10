import mongoose from 'mongoose'
import ICategory from 'types/models/CategoryModel'

const CategorySchema = new mongoose.Schema<ICategory>({
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

CategorySchema.methods.doc = function () {
  return this._doc
}

export default mongoose.model('category', CategorySchema)

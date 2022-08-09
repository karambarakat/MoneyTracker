import mongoose from 'mongoose'

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

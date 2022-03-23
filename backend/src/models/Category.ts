import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    enum: [
      '#f8cd92',
      '#6074ff',
      '#ec7194',
      '#4cbfbc',
      '#d38ead',
      '#d289f5',
      '#1ca2ef',
      '#a178fa',
    ],
    required: true,
  },
  icon: { type: String, required: true },
})

export default mongoose.model('category', CategorySchema)

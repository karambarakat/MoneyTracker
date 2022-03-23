import mongoose from 'mongoose'

const LogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
  },
  note: {
    type: String,
  },
})

export default mongoose.model('log', LogSchema)

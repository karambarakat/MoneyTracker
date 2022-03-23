import mongoose from 'mongoose'

const Log = new mongoose.Schema({
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

export default Log

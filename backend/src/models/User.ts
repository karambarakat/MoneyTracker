import mongoose from 'mongoose'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { generateToken } from '@utils/tokens'

export interface UserInterface {
  _id: string
  userName: string
  email: string
  password: string
  createdAt?: string | Date
  updatedAt?: string | Date

  matchPasswords: (password: string) => boolean
  withToken: () => string
}

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      default: function () {
        return 'user-' + uuidv4().split('-')[0]
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (email: string): boolean {
          return /^\S+@\S+\.\S+$/.test(email)
        },
        message: 'not a valid email',
      },
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.methods.withToken = function () {
  delete this._doc.password

  return {
    ...this._doc,
    token: generateToken(this._id),
  }
}

UserSchema.methods.matchPasswords = function (given: string) {
  const salt = process.env.SALT as string
  const hash = crypto.pbkdf2Sync(given, salt, 100, 64, 'sha512').toString('hex')
  return hash === this.password
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()
  else {
    const salt = process.env.SALT as string
    this.password = crypto
      .pbkdf2Sync(this.password, salt, 100, 64, 'sha512')
      .toString('hex')
  }
})

UserSchema.pre('updateOne', async function (next) {
  if (!this._update.password) next()
  else {
    const salt = process.env.SALT as string
    this._update.password = crypto
      .pbkdf2Sync(this._update.password, salt, 100, 64, 'sha512')
      .toString('hex')
  }
})

export default mongoose.model('user', UserSchema)

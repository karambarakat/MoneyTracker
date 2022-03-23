import mongoose from 'mongoose'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { generateToken } from '@utils/tokens'

export interface UserInterface {
  _id: string
  userName: string
  email: string
  password: string
  createAt: string | Date
  updateAt: string | Date
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
        validator: function (): boolean {
          // @ts-ignore
          return /^\S+@\S+\.\S+$/.test(this.email)
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
  return {
    ...this,
    token: generateToken(this._id),
  }
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

export default UserSchema

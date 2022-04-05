import mongoose from 'mongoose'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import { generateToken } from '@utils/tokens'

export interface UserInterface {
  _id: string
  userName: string
  email: string
  password: string
  googleProfile: any
  createdAt?: string | Date
  updatedAt?: string | Date
  matchPasswords: (password: string) => boolean
  withToken: () => {
    _id: string
    userName: string
    email: string
    googleProfile: any
    createdAt?: string | Date
    updatedAt?: string | Date
    token: string
  }
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
      unique: true,
    },
    provider: {
      type: String,
      required: true,
      enum: ['local', 'google'],
    },
    googleProfile: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

/**
 * validation: require password if the provider is local
 */
UserSchema.pre('save', async function (next) {
  if (this.provider !== 'local') next()
  else {
    if (!this.password) {
      const error = new Error(
        'user validation failed: password is required field'
      )
      error.name = 'ValidationError'
      // @ts-ignore
      error.errors = {
        password: {
          name: 'validatorError',
          message: 'password is required field',
        },
      }
      next(error)
    } else {
      next()
    }
  }
})

/**
 * methods attached to any instance of User, used to generate token, match password
 */
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

/**
 * hashing of the password before saving to the database
 */
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

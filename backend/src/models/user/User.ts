import { db } from '@config/db-conn'
import { UserInterface, userSchema } from './schema'
import crypto from 'crypto'
import { Filter, ObjectId } from 'mongodb'
import HttpError from '@error-handler/HttpError'
import { ValidationError } from '@error-handler/Errors'
import { generateToken } from '@utils/tokens'
import UserInstance from './methods'

const collection = 'users'

export async function insertOne(obj: any) {
  await userSchema.validate(obj).catch((err) => HttpError(ValidationError(err)))
  const validated = userSchema.cast(obj)

  const user = new UserInstance(validated)

  user.hashPassword()
  const muser = await db.collection(collection).insertOne(user._user)

  return user
}

export async function findOne(filter: any) {
  const user: any = await db.collection(collection).findOne(filter)
  if (user) {
    return new UserInstance(user)
  } else {
    return null
  }
}

export async function findById(id: string) {
  const user: any = await db
    .collection(collection)
    .findOne({ _id: new ObjectId(id) })

  if (user) {
    return new UserInstance(user)
  } else {
    return null
  }
}

export default db.collection(collection)

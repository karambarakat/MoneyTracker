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

  user.hashPassword() //middleware
  await db.collection(collection).insertOne(user._user)

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

/**
 * !Problems with this code:
 * you can use javascript getters and setter to determine what properties has changed
 * on each setter you can run the assigned validator
 * use middleware to hash password
 * use middleware to update `UpdatedAt`
 *
 * save your set initiating UserInstance and returning the correct value everytime you run a function
 * @param currentUser
 * @param obj
 */
export async function updateOne(currentUser: UserInterface, obj: any) {
  const replaceBy = Object.keys(obj)
    .filter((key) => obj[key])
    .reduce((p: any, c) => {
      p[c] = obj[c]
      //@ts-ignore
      currentUser[c] = obj[c]
      return p
    }, {})

  if (currentUser.password) {
    UserInstance.prototype.hashPassword.apply({ _user: replaceBy })
  } else {
    currentUser.password = ' '
  }

  await userSchema
    .validate(currentUser)
    .catch((err) => HttpError(ValidationError(err)))

  //@ts-ignore
  delete currentUser.password

  const result = await db
    .collection(collection)
    .updateOne(
      { _id: new ObjectId(currentUser._id) },
      { $set: { ...replaceBy, updatedAt: new Date() } }
    )

  // if (result.matchedCount !== 1) throw new Error('nothing has been updated')
}

export default db.collection(collection)

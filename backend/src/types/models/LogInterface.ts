import { ObjectId } from 'mongodb'

export default interface LogInterface {
  _id?: string
  title: string
  amount: string
  createdBy?: ObjectId | string
  category?: object
  note?: string

  createdAt?: string | Date
  updatedAt?: string | Date
}

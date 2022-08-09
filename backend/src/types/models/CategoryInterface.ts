import { ObjectId } from 'mongodb'

export default interface CategoryInterface {
  _id?: string
  title: string
  color: string
  icon: string
  createdBy?: ObjectId | string

  createdAt?: string | Date
  updatedAt?: string | Date
}

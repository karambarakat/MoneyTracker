import { ObjectId } from 'mongodb'
import { Document } from 'mongoose'

export default interface ICategoryModel {
  _id: ObjectId | string

  title: string
  color?: string
  icon?: string
  createdBy: ObjectId | string

  doc: () => CategoryDoc
}

export type CategoryMongoose = ICategoryModel &
  Document<unknown, any, ICategoryModel> & {
    _id: string | ObjectId
  }

export interface CategoryDoc {
  _id: string

  title: string
  color?: string
  icon?: string
  createdBy: string

  __v: number
}

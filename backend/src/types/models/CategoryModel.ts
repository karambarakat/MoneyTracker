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

export interface CategoryDoc {
  _id: string

  title: string
  color?: string
  icon?: string
  createdBy: string

  __v: number
}

import { ObjectId } from 'mongodb'
import { Document } from 'mongoose'

export default interface ILog {
  _id: ObjectId | string

  title: string
  amount: number
  createdBy: ObjectId | string
  category?: string | null
  note?: string

  doc: () => {}

  createdAt: string | Date
  updatedAt: string | Date
}

export type LogMongoose = ILog &
  Document<unknown, any, ILog> & {
    _id: string | ObjectId
  }

export interface LogDoc {
  title: string
  amount: number
  createdBy: string
  category?: {}
  note?: string
  _id: string
  createdAt: string
  updateAt: string
  __v: number
}

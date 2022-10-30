import { ObjectId } from 'mongodb'
import { Document } from 'mongoose'

export default interface ILog {
  _id: ObjectId | string

  title: string
  amount: number
  createdBy: ObjectId | string
  category?: string | null
  note?: string

  doc: () => LogDoc

  createdAt: string | Date
  updatedAt: string | Date
}

export interface LogDoc {
  _id: string

  title: string
  amount: number
  createdBy: string
  category?: {
    _id: string
    title: string
    color: string
  }
  note?: string

  createdAt: string
  updateAt: string
  __v: number
}

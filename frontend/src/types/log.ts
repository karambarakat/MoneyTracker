import { CatDoc } from './category'
import { Doc, ObjectId, TimeStamped, _id } from './general'

export interface LogFields {
  title: string
  amount: number
  category?: string
  note?: string
}

export interface LogDoc extends Omit<LogFields, 'category'>, Doc, TimeStamped {
  category?: Omit<CatDoc, 'createdBy' | 'logs' | '__v'>
  createdBy: string
}

export interface LogModel extends LogFields {
  doc: () => LogDoc
  createdBy: string | ObjectId
}

export type apiLogCreate = LogFields
export type apiLogUpdate = Partial<LogFields>

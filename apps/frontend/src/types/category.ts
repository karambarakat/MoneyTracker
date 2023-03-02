import { Doc, ObjectId, TimeStamped, _id } from './general'

export interface CatFields {
  title: string
  color?: string
  icon?: string
}

export interface CatDoc extends CatFields, Doc {
  createdBy: string
}

export interface CatModel extends CatFields {
  doc: () => CatDoc
}

export type apiCatCreate = CatFields
export type apiCatUpdate = Partial<CatFields>

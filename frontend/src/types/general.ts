export interface Doc {
  _id: string
  __v: 0 | { offline: 0 }
}

export interface _id {
  _id: string
}

export type ObjectId = {}

export interface TimeStamped {
  createdAt: string | Date
  updatedAt: string | Date
}

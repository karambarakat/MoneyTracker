type T = {
  createdAt: string
  updatedAt: string
}

type Doc = {
  _id: string
  __v: number
}

export interface Profile extends T, Doc {
  displayName: string
  email: string
  providers: ('local' | 'google')[]
  picture?: string
  token: string
}

export interface Log extends T, Doc {
  createdBy: Profile | string
  title: string
  amount: number
  category?: Category_out
  note?: string
}

export type Log_out = Log

export type Log_in = Omit<Log, 'category' | '_id' | '__v' | 'createdBy'> & {
  category?: string
}

export interface Category extends Doc {
  createdBy: Profile | string
  title: string
  color?: string
  icon?: string
}

export type Category_out = Category

export type category_in = Omit<Category, '_id' | '__v' | 'createdBy'>

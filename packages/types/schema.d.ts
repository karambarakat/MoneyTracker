type T = {
  createdAt: string
  updatedAt: string
}

type Doc = {
  _id: string
  __v: number
}

type Optional<V> = V | null

export interface Profile extends T, Doc {
  displayName: string
  email: string
  providers: ('local' | 'google')[]
  picture: Optional<string>
  token: string
}

export interface Log extends T, Doc {
  createdBy: Profile | string
  title: string
  amount: number
  category: Optional<CategoryPopulated | string>
  note: Optional<string>
}

export interface Category extends Doc {
  createdBy: Profile | string
  title: string
  color: Optional<string>
  icon: Optional<string>
}

export type CategoryPopulated = Pick<Category, '_id' | 'title' | 'color' | 'icon'>
declare namespace schema {
  // this type can be overrode to determine the correct implementation depending on the backend or the frontend
  type Optional<T> = T | null | undefined
  // this type can be overrode to determine the correct implementation depending on the backend or the frontend
  type IsPopulated<Y, N> = N
  // this type can be overrode to determine the correct implementation depending on the backend or the frontend
  type Id = string
  // this type can be overrode to determine the correct implementation depending on the backend or the frontend
  type V = 0
  // this type can be overrode to determine the correct implementation depending on the backend or the frontend
  type T = {
    createdAt: string | Date
    updatedAt: string | Date
  }

  interface Profile extends T {
    _id: Id
    __v: V
    userName: string
    email: string
    providers: ('local' | 'google')[]
    picture?: Optional<string>
  }

  interface Log extends T {
    _id: Id
    __v: V
    createdBy: IsPopulated<Profile, string>
    title: string
    amount: number
    category?: //
    Optional<IsPopulated<Pick<Cat, '_id' | 'title' | 'color' | 'icon'>, string>>
    note?: Optional<string>
  }

  interface Cat {
    _id: Id
    __v: V
    createdBy: IsPopulated<Profile, string>
    title: string
    color?: Optional<string>
    icon?: Optional<string>
  }
}

declare namespace schema {
  // this type can be overrode to determine the correct implementation depending on the backend or the frontend
  /**
  type Optional<T> = T | null | undefined
  type IsPopulated<Y, N> = N
  type Id = string
  type V = 0
  type T = {
    createdAt: string | Date
    updatedAt: string | Date
  }
  */

  interface Profile extends T {
    _id: Id
    __v: V
    displayName: string
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

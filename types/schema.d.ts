/**
 * the following types have to defined on the subsecquent dependency 
 * with the following syntax:
 * ```
 * declare module "types/schema" {
 *  type isPopulated<A, B> = B
 *  ...
 * }
 * ```
type isPopulated<A, B> = B
type Doc = {
  _id: string
  __v: number
}
type T = {
  createdAt: string
  updatedAt: string
}
type Optional<V> = V | undefined | null
*/
export interface Profile extends T, Doc {
  DisplayName: string
  email: string
  providers: ('local' | 'google')[]
  picture?: Optional<string>
}


export interface Log extends T, Doc {
  createdBy: isPopulated<Profile, string>
  title: string
  amount: number
  category?: Optional<
    isPopulated<Pick<Cat, '_id' | 'title' | 'color' | 'icon'>, string>
  >
  note?: Optional<string>
}

export interface Cat extends Doc {
  createdBy: isPopulated<Profile, string>
  title: string
  color?: Optional<string>
  icon?: Optional<string>
}

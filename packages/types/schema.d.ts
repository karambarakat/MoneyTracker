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
*/
type Optional<V> = V | undefined | null

export interface Profile extends T, Doc {
  displayName: string
  email: string
  providers: ('local' | 'google')[]
  picture?: Optional<string>
  token?: string
}


export interface Log<P extends boolean> extends T, Doc {
  createdBy: P extends true ? Profile : string
  title: string
  amount: number
  category?: Optional<
    P extends true ? Pick<Cat<false>, '_id' | 'title' | 'color' | 'icon'> : string
  >
  note?: Optional<string>
}

export interface Cat<P extends boolean> extends Doc {
  createdBy: P extends true ? Profile : string
  title: string
  color?: Optional<string>
  icon?: Optional<string>
}

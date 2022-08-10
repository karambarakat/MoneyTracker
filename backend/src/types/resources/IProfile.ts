// with token
export default interface IProfile {
  userName: string
  email: string
  providers: ('local' | 'google')[]
  _id: string
  googleProfile: undefined | Object
  picture?: string
  createdAt: string
  updatedAt: string
  __v: number
  token: string
}

// result of this._doc
export interface IProfileRaw {
  userName: string
  email: string
  providers: ('local' | 'google')[]
  _id: string
  googleProfile: undefined | Object
  picture?: string
  createdAt: string
  updatedAt: string
  __v: number

  // extra password -- no token
  password?: string
}

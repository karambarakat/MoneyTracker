interface IProfile {
  userName: string
  email: string
  provider: ('local' | 'google')[]
  _id: string
  googleProfile: undefined | Object
  createdAt: string
  updatedAt: string
  __v: number
  token: string
}

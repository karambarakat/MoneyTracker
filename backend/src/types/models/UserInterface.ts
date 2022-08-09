import { ObjectId } from 'mongodb'

export default interface UserInterface {
  _id: string
  userName: string
  email: string
  password: string
  googleProfile: any
  createdAt?: string | Date
  updatedAt?: string | Date
  providers: ('local' | 'google')[]
  matchPasswords: (password: string) => boolean
  withToken: () => {
    _id: string
    userName: string
    email: string
    googleProfile: any
    createdAt?: string | Date
    updatedAt?: string | Date
    token: string
  }
}

import { ObjectId } from 'mongodb'
import { Profile } from 'passport-google-oauth20'
import IProfile from 'types/resources/IProfile'

export interface IUser_google {
  refreshToken: string
  accessToken: string
  json: Profile['_json']
}

export default interface IUser {
  _id: string
  userName: string
  email: string
  password: string
  googleInfo: undefined | IUser_google
  createdAt: string | Date
  updatedAt: string | Date
  providers: ('local' | 'google')[]
  matchPasswords: (password: string) => boolean
  withToken: () => IProfile
}

import { ObjectId } from 'mongodb'
import { Profile } from 'passport-google-oauth20'
import { Document } from 'mongoose'

export interface IUser_google {
  refreshToken: string
  accessToken: string
  json: Profile['_json']
}

export default interface IUser {
  _id: string | ObjectId

  displayName: string
  email: string
  password: string
  picture: string | undefined
  googleInfo: undefined | IUser_google
  providers: ('local' | 'google')[]

  matchPasswords: (password: string) => boolean
  doc: () => ProfileDoc

  updatedAt: string | Date
  createdAt: string | Date
}

// return of doc()
export interface ProfileDoc {
  _id: string

  displayName: string
  email: string
  googleProfile: undefined | Object
  providers: ('local' | 'google')[]
  picture?: string
  createdAt: string
  updatedAt: string
  __v: number
  token: string
}

// result of this._doc
export interface ProfileRawDoc {
  _id: string

  displayName: string
  email: string
  googleProfile: undefined | Object
  providers: ('local' | 'google')[]
  picture?: string
  createdAt: string
  updatedAt: string
  __v: number

  // extra password -- no token
  password?: string
}

export interface apiGoogleCallbackParams {
  token: string
  displayName: string
  _id: string
}

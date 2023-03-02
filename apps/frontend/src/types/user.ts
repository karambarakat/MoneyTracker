import { CatDoc } from './category'
import { Doc, ObjectId, TimeStamped as TS, _id } from './general'

export interface UserFields {
  displayName: string
  email: string
  providers: ('local' | 'google')[]
  picture?: string
}

export interface UserDoc extends Omit<UserFields, 'password'>, Doc, TS {
  token: string
}

export interface UserDocRaw extends UserFields, Doc, TS {
  token: string
}

export interface UserModel extends UserFields {
  matchPasswords: (password: string) => boolean
  doc: () => UserDoc
  googleInfo:
    | undefined
    | {
        refreshToken: string
        accessToken: string
        json: {
          iss: string
          azp?: string
          aud: string
          sub: string
          at_hash?: string
          iat: number
          exp: number
          email?: string
          email_verified?: 'true' | 'false'
          given_name?: string
          family_name?: string
          name?: string
          hd?: string
          locale?: string
          nonce?: string
          picture?: string
          profile?: string
        }
      }
}
export type apiUserSignup = {
  email: string
  password: string
  displayName?: string
}
export type apiUserLogin = {
  email: string
  password: string
}
export interface apiUserStatus {
  email: string
}
export interface apiProfileUpdate {
  displayName?: string
  picture?: string
}
export interface apiProfileUpdate_nolocal {
  newPassword: string
}
export interface apiProfileUpdate_local {
  oldPassword: string
  newPassword: string
}
export interface apiGoogleCallbackParams {
  token: string
  displayName: string
  _id: string
}

import crypto from 'crypto'
import { generateToken } from '@utils/tokens'

export default class UserInstance {
  _user: any
  constructor(user: any) {
    this._user = user
  }

  hashPassword() {
    const salt = process.env.SALT as string
    this._user.password = crypto
      .pbkdf2Sync(this._user.password as string, salt, 100, 64, 'sha512')
      .toString('hex')
  }

  matchPasswords(enteredPassword: string) {
    const salt = process.env.SALT as string
    const hashedEntered = crypto
      .pbkdf2Sync(enteredPassword, salt, 100, 64, 'sha512')
      .toString('hex')
    return hashedEntered === this._user.password
  }

  lean() {
    delete this._user.password
    return { ...this._user, token: generateToken(this._user._id) }
  }
}

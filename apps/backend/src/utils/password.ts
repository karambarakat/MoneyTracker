import crypto from 'crypto'
const salt = process.env.SALT as string

const hash = (string: string) =>
  crypto.pbkdf2Sync(string, salt, 100, 64, 'sha512').toString('hex')

export function hashPassword(password: string) {
  return hash(password)
}

export function matchPasswords(hashed: string, toMatch: string) {
  const toMatchHashed = hash(toMatch)
  return toMatchHashed === hashed
}

import jwt from 'jsonwebtoken'

export function generateTokenToBody(body: any): string {
  return jwt.sign(body, process.env.JWT_SECRET as string, {
    expiresIn: '2d'
  })
}

export function generateToken(id: string, email: string): string {
  return jwt.sign({ _id: id, email }, process.env.JWT_SECRET as string, {
    expiresIn: '2d'
  })
}

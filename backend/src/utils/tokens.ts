import jwt from 'jsonwebtoken'

export function generateTokenToBody(body: any): string {
  return jwt.sign(body, process.env.JWT_SECRET as string, {
    expiresIn: '2d',
  })
}

export function generateToken(id: string): string {
  return jwt.sign({ sub: id }, process.env.JWT_SECRET as string, {
    expiresIn: '2d',
  })
}

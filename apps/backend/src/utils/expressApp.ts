import { BadBasicToken } from '@utils/httpError/errTypes'
import express from 'express'
import { Request } from 'express'

export default function expressApp() {
  const app = express()
  app.use('static', express.static('static'))
  app.use((req, res, next) => {
    req.getBasicToken = () => BasicToken(req)
    next()
  })
  return app
}

export function BasicToken(req: Request) {
  let basicToken
  const header = (req.headers.authorization || '').split(' ')
  if (!(basicToken = header[1]) || header[0] !== 'Basic') {
    throw BadBasicToken()
  }

  const [email, password] = Buffer.from(basicToken, 'base64')
    .toString()
    .split(':')

  if (!email || !password) throw BadBasicToken()

  return { email, password }
}

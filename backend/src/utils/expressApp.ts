import { BadBasicToken } from '@httpErrors/errTypes'
import express from 'express'

export default function expressApp () {
  const app =  express()
  app.use('static', express.static('static'))
  app.use((req, res, next) => {
    req.getBasicToken = () => BasicToken(req.header('Authorization'))
    next()
  })
  return app
}


function BasicToken(header?: string) {
  var basicToken
  if (!(basicToken = header?.split(' ')[1]) || header?.split(' ')[0] !== 'Basic'){
    throw BadBasicToken()
  }

  const [email, password] = Buffer.from(basicToken, 'base64')
    .toString()
    .split(':')

  if (!email || !password) throw BadBasicToken()

  return { email, password }
}

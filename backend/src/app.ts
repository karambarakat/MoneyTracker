import '@config/env'
import conn, { db } from '@config/db-conn'
import express from 'express'
import morgan from 'morgan'
import usersController from '@controllers/authController'
import HTTPErrorHandler from '@error-handler/HTTPErrorHandler'
import apiIsWorking from '@middlewares/apiIsWorking'
import e404 from '@middlewares/E404'
import e500 from '@middlewares/e500'
import _ from 'express-async-handler'
import passport from 'passport'
import { ExtractJwt, Strategy as jwtStrategy } from 'passport-jwt'
import * as User from '@models/user/User'
import { useJWT } from '@utils/registerStrategies'
import auth from '@middlewares/auth'
import { ObjectId } from 'mongodb'

const app = express()

async function main() {
  await conn()

  passport.use(useJWT)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(morgan('dev'))

  app.get('/', apiIsWorking)

  app.get(
    '/exp',
    auth,
    _(async (req, res) => {
      const clg = await db
        .collection('users')
        .updateOne(
          { _id: new ObjectId('623797ebb25f8149a8ebc765') },
          { $set: {} }
        )
      console.log(clg)

      res.json({ done: true, user: req.user })
    })
  )

  app.use('/api/v1/auth', usersController)

  app.use('*', e404)
  app.use(HTTPErrorHandler)
  app.use(e500)

  app.listen(process.env.PORT || 8811, () => {})
}

main().catch(console.error)

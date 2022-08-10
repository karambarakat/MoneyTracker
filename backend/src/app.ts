import '@config/env'
import { Document } from 'mongoose'

// libraries
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

// controllers
import localAuthController from '@controllers/auth.email.controller'
import googleAuthController from '@controllers/auth.google.controller'
import profileController from '@controllers/profileController'
import logController from '@controllers/logController'
import categoryController from '@controllers/categoryController'
import apiIsWorking, { serverIsWroking } from '@middlewares/apiIsWorking'

import { HTTPErrorHandler } from '@httpErrors'
import {
  e404_ResourceNotFound as e404,
  e500_ServerError as e500,
  e400_MongooseValidation as e400_mongoose,
  e400_JsonError as e400_json,
} from '@httpErrors/errMiddlewares'

//passport
import passport from 'passport'
import { useJWT } from '@passport/local'
import { useGoogle } from '@passport/google'
import PassportSerialization from '@passport/serialize'
import IUser, { UserMongoose } from 'types/models/UserModel'
import ILog, { LogMongoose } from 'types/models/LogModel'

declare global {
  namespace Express {
    interface User extends UserMongoose {}
    interface Request {
      log?: LogMongoose
    }
  }
}

const app = express()

app.set('json replacer', function (key: string, value: null) {
  if (typeof value === 'undefined') {
    return null
  }
  return value
})

PassportSerialization()
passport.use(useJWT)
passport.use(useGoogle)

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(e400_json)
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

/**
 * Controllers
 */
const api = express.Router()
api.get('/', apiIsWorking)
api.use('/v1/auth/local', localAuthController)
api.use('/v1/auth/google', googleAuthController)
api.use('/v1/profile', profileController)
api.use('/v1/log', logController)
api.use('/v1/category', categoryController)

api.use('*', e404)

app.use('/api', api)

/**
 * Errors/Handlers
 */
app.use(e400_mongoose)
app.use(HTTPErrorHandler)
app.use(e500)

export default app

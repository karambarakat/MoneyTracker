import { Document } from 'mongoose'

// libraries
import express from 'express'
import morgan from 'morgan'

import expressApp from '@utils/expressApp'

// controllers
import localAuthController from '@controllers/auth.email.controller'
import googleAuthController from '@controllers/auth.google.controller'
import profileController from '@controllers/profileController'
import logController from '@controllers/logController'
import categoryController from '@controllers/categoryController'
import apiIsWorking from '@middlewares/apiIsWorking'


import { HTTPErrorHandler } from '@utils/httpError'
import {
  e404_ResourceNotFound as e404,
  e500_ServerError as e500,
  e400_MongooseValidation as e400_mongoose,
  e400_JsonError as e400_json,
} from '@utils/httpError/errMiddlewares'

//passport
import passport from 'passport'
import { useJWT } from '@config/useJWT'
import { useGoogle } from '@config/useGoogle'
import PassportSerialization from '@config/PassportSerialize'
import JSONReplacer from '@utils/JSONReplacer'
import type { IProfile } from '@models/User'
import type { ILog } from '@models/Log'
import type { ICategory } from '@models/Category'

declare module 'types/schema' {
  type isPopulated<A, B> = A
  type Doc = {
    _id: string
    __v: number
  }
  type T = {
    createdAt: string
    updatedAt: string
  }
}

declare global {
  namespace Express {
    interface User extends Omit<IProfile, '_id'>, Document<any, any, IProfile> { }
    interface Request {
      log?: ILog<true> & Document<any, any, ILog<true>>
      category?: ICategory & Document<any, any, ICategory>
      getBasicToken: () => Record<'email' | 'password', string>
    }
  }
}

const app = expressApp()

app.set('json replacer', JSONReplacer)

PassportSerialization()
passport.use(useJWT)
passport.use(useGoogle)

app.set('trust proxy', true)
app.use(express.json())
app.use(e400_json)
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

/**
 * Controllers
 */
const api = express.Router()
api.all('/', apiIsWorking)
api.use('/auth/local', localAuthController)
api.use('/auth/google', googleAuthController)
api.use('/profile', profileController)
api.use('/log', logController)
api.use('/category', categoryController)

api.use('*', e404)

app.use('/api/v1', api)

import { doc } from 'openapi-docs'
app.use(doc)

app.all('*', (_, res) => res.status(404).send('go to /api/v1'))

/**
 * Errors/Handlers
 */
app.use(e400_mongoose)
app.use(HTTPErrorHandler)
app.use(e500)

export { app }

import log from '@utils/log'
import db_conn from '@config/db-conn'

async function main() {
  await db_conn()
  const PORT = process.env.PORT || 8080
  app.listen(PORT, () => log('app', `listening at port ${PORT}`))
}

if (module.id === '.' || (module.id as unknown as number) === 0) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

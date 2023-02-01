/**
 * @module moduleNewName
 */
import { Document } from 'mongoose'

// libraries
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'

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
import IUser from 'types/models/UserModel'
import ILog from 'types/models/LogModel'
import ICategory from 'types/models/CategoryModel'
import JSONReplacer from '@utils/JSONReplacer'

declare global {
  namespace Express {
    interface User extends Omit<IUser, '_id'>, Document<any, any, IUser> {}
    interface Request {
      log?: ILog & Document<any, any, ILog>
      category?: ICategory & Document<any, any, ICategory>
    }
  }
  namespace schema {
    type Optional<T> = T | null | undefined
    type IsPopulated<Y, N> = N
    type Id = number
    type V = 0
    type T = {
      createdAt: string | Date
      updatedAt: string | Date
    }
  }
}

const app = express()

app.set('json replacer', JSONReplacer)

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
api.all('/', apiIsWorking)
api.use('/auth/local', localAuthController)
api.use('/auth/google', googleAuthController)
api.use('/profile', profileController)
api.use('/log', logController)
api.use('/category', categoryController)

api.use('*', e404)

app.use('/api/v1', api)

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/docs/json', express.static('./swagger.json'))

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
  const PORT = process.env.PORT || 8811
  app.listen(PORT, () => log('app', `listening at port ${PORT}`))
}

main().catch(console.error)

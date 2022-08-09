import '@config/env'

// libraries
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

// controllers
import authController from '@controllers/authController'
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
import { useGoogle, useJWT } from '@utils/registerStrategies'

const app = express()

passport.use(useJWT)
passport.use(useGoogle)

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(e400_json)
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

const api = express.Router()

/**
 * Controllers
 */
api.get('/', apiIsWorking)
api.use('/v1/auth', authController)
api.use('/v1/profile', profileController)
api.use('/v1/log', logController)
api.use('/v1/category', categoryController)

api.use('*', e404)

app.use('/api', api)

/**
 * Errors/Handlers
 */
app.use('*', serverIsWroking)
app.use(e400_mongoose)
app.use(HTTPErrorHandler)
app.use(e500)

export default app

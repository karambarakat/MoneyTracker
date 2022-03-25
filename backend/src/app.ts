import '@config/env'
import express from 'express'
import morgan from 'morgan'
import authController from '@controllers/authController'
import profileController from '@controllers/profileController'
import HTTPErrorHandler from '@error-handler/HTTPErrorHandler'
import apiIsWorking from '@middlewares/apiIsWorking'
import e404 from '@middlewares/E404'
import e500 from '@middlewares/e500'
import passport from 'passport'
import { useJWT } from '@utils/registerStrategies'
import e400Mongoose from '@middlewares/e400'

const app = express()

passport.use(useJWT)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

/**
 * Controllers
 */
app.get('/', apiIsWorking)
app.use('/api/v1/auth', authController)
app.use('/api/v1/profile', profileController)

/**
 * Errors/Handlers
 */
app.use('*', e404)
app.use(e400Mongoose)
app.use(HTTPErrorHandler)
app.use(e500)

export default app

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

import HTTPErrorHandler from '@error/HTTPErrorHandler'

// middlewares
import apiIsWorking from '@middlewares/apiIsWorking'
import e404 from '@middlewares/E404'
import e500 from '@middlewares/e500'
import e400Mongoose from '@middlewares/e400'
import handleJsonError from '@middlewares/eJson'

//passport
import passport from 'passport'
import { useGoogle, useJWT } from '@utils/registerStrategies'

const app = express()
const main = express.Router()

passport.use(useJWT)
passport.use(useGoogle)

main.use(cors({ origin: 'http://localhost:3000' }))
main.use(express.json())
main.use(handleJsonError)
main.use(express.urlencoded({ extended: true }))
main.use(morgan('dev'))

/**
 * Controllers
 */
main.get('/', apiIsWorking)
main.use('/v1/auth', authController)
main.use('/v1/profile', profileController)
main.use('/v1/log', logController)
main.use('/v1/category', categoryController)

/**
 * Errors/Handlers
 */
main.use('*', e404)
main.use(e400Mongoose)
main.use(HTTPErrorHandler)
main.use(e500)

export const router = main

app.use('/api', main)

export default app

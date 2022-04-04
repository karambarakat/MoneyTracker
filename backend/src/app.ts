import '@config/env'

// libraries
import express from 'express'
import morgan from 'morgan'

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

//passport
import passport from 'passport'
import { useGoogle, useJWT } from '@utils/registerStrategies'
import handleJsonError from '@middlewares/eJson'

const app = express()
const main = express.Router()

passport.use(useJWT)
passport.use(useGoogle)

main.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  next()
})
main.use(express.json())
main.use(handleJsonError)
main.use(express.urlencoded({ extended: true }))
main.use(morgan('dev'))

/**
 * Controllers
 */
main.get('/', apiIsWorking)
main.use('/auth', authController)
main.use('/profile', profileController)
main.use('/log', logController)
main.use('/category', categoryController)

/**
 * Errors/Handlers
 */
main.use('*', e404)
main.use(e400Mongoose)
main.use(HTTPErrorHandler)
main.use(e500)

export const router = main

app.use('/api/v1', main)

export default app

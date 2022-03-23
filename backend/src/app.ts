import '@config/env'
import conn, { db } from '@config/db-conn'
import express from 'express'
import morgan from 'morgan'
import authController from '@controllers/authController'
import HTTPErrorHandler from '@error-handler/HTTPErrorHandler'
import apiIsWorking from '@middlewares/apiIsWorking'
import e404 from '@middlewares/E404'
import e500 from '@middlewares/e500'
import _ from 'express-async-handler'
import passport from 'passport'
import { useJWT } from '@utils/registerStrategies'
import eValidation from '@middlewares/e400'

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
    // auth,
    _(async (req, res) => {
      const e = new Error('ValidationError')
      e.name = 'ValidationError'
      throw e
    })
  )

  app.use('/api/v1/auth', authController)

  app.use('*', e404)
  app.use(eValidation)
  app.use(HTTPErrorHandler)
  app.use(e500)

  app.listen(process.env.PORT || 8811, () => {})
}

main().catch(console.error)

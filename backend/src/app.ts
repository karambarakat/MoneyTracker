import '@config/env'
import conn from '@config/db-conn'
import express from 'express'
import morgan from 'morgan'
import authController from '@controllers/authController'
import profileController from '@controllers/profileController'
import HTTPErrorHandler from '@error-handler/HTTPErrorHandler'
import apiIsWorking from '@middlewares/apiIsWorking'
import e404 from '@middlewares/E404'
import e500 from '@middlewares/e500'
import _ from 'express-async-handler'
import passport from 'passport'
import { useJWT } from '@utils/registerStrategies'
import e400Mongoose from '@middlewares/e400'
import Log from '@models/Log'
import User from '@models/User'
import log from '@utils/log'

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
      console.log(await User.find({ email: 'kdsd@laco.sd9m' }))
      res.json({ done: true })
    })
  )

  app.use('/api/v1/auth', authController)
  app.use('/api/v1/profile', profileController)

  app.use('*', e404)
  app.use(e400Mongoose)
  app.use(HTTPErrorHandler)
  app.use(e500)

  const PORT = process.env.PORT || 8811
  app.listen(PORT, () => log('app', `listening at port ${PORT}`))
}

main().catch(console.error)

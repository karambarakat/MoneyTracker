import '@config/env'
import conn, { db } from '@config/db-conn'
import express from 'express'
import morgan from 'morgan'
import usersController from '@controllers/usersController'
import HTTPErrorHandler from '@error-handler/HTTPErrorHandler'
import apiIsWorking from '@middlewares/apiIsWorking'
import e404 from '@middlewares/E404'
import e500 from '@middlewares/e500'

const app = express()

async function main() {
  await conn()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(morgan('dev'))

  app.use('/', apiIsWorking)
  app.use('/api/v1/users', usersController)

  app.use('*', e404)

  app.use(HTTPErrorHandler)
  app.use(e500)

  app.listen(process.env.PORT || 8811, () => {})
}

main()

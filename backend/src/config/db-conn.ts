import log from '@utils/log'
import mongoose from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import _ from 'express-async-handler'

async function connect() {
  log('database', 'connecting ...')

  var url = process.env.MONGO_STRING as string

  await mongoose.connect(url).catch((err) => {
    log('database', 'failed', err)
    throw new Error('database failed to connect')
  })

  log('database', 'connected')
}

export const disconnect = mongoose.disconnect

export default connect

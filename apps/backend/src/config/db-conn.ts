import log from '@utils/log'
import mongoose from 'mongoose'
import _ from 'express-async-handler'

async function db_conn() {
  log('database', 'connecting ...')

  const url = process.env.MONGO_STRING as string

  await mongoose.connect(url).catch(err => {
    log('database', 'failed', err)
    throw new Error('database failed to connect')
  })

  log('database', 'connected')
}

export const connection = mongoose.connection
export const disconnect = mongoose.disconnect

export default db_conn

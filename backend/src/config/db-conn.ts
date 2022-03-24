import log from '@utils/log'
import mongoose from 'mongoose'

var url = process.env.MONGO_STRING as string

async function main() {
  log('database', 'connecting ...')

  await mongoose
    .connect(url)
    .then(() => log('database', 'connected'))
    .catch((err) => log('database', 'failed', err))
}

export default main

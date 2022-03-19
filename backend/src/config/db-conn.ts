import log from '@utils/log'
import { MongoClient } from 'mongodb'

var url = process.env.MONGO_STRING as string
url = process.env.MONGO_STRING_USE_LOCAL ? 'mongodb://localhost:27017/' : url

const client = new MongoClient(url)

async function main() {
  log('database', 'connecting ...')

  await client
    .connect()
    .then(() => log('database', 'connected'))
    .catch((err) => log('database', 'failed', err))
}

export const db = client.db('MoneyApp')

export default main

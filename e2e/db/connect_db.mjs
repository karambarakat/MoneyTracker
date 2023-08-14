/* eslint-env node */
import { assert } from 'console'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_STRING)
assert(process.env.MONGO_STRING, 'no string provided')
assert(process.env.MONGO_DB, 'no db provided')

export async function connect_db() {
  await client.connect()

  console.log('db connected')

  return client.db(process.env.MONGO_DB || 'test')
}

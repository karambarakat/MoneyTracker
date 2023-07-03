/* eslint-env node */
import { assert } from 'console'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_STRING)

async function main() {
  assert(process.env.MONGO_STRING, 'no string provided')
  assert(process.env.MONGO_DB, 'no db provided')

  await client.connect()

  await client.db(process.env.MONGO_DB || 'test').dropDatabase()

  console.log('db deleted')
}

main().finally(() => client.close())

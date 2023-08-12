/* eslint-env node */
import { assert } from 'console'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_STRING)
assert(process.env.MONGO_STRING, 'no string provided')
assert(process.env.MONGO_DB, 'no db provided')

export async function main() {
  await client.connect()

  await client.db(process.env.MONGO_DB || 'test').dropDatabase()

  console.log('db deleted')
}

main().finally(() => client.close())

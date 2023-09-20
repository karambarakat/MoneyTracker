/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
/* eslint-env node */
const assert = require('assert')
const express = require('express')
const { parse } = require('pg-connection-string')
const { Client } = require('pg')
const $ = require('express-async-handler')

if (process.env.NODE_ENV !== 'test') {
  throw new Error('this script is only for testing environments')
}

assert(process.env.PORT, 'no port provided')
assert(process.env.DATABASE_URL, 'no string provided')
if (!process.env.DATABASE_URL && typeof process.env.DATABASE_URL !== 'string') {
  throw new Error('DATABASE_URL must be a string')
}

const config = parse(process.env.DATABASE_URL)
const client = new Client({
  user: config.user,
  database: config.database,
  password: config.password,
  port: Number(config.port || 5432),
})

async function main() {
  await client.connect()
  console.log('db connected')

  const app = express()

  app.get(
    '/clean_db',
    $(async (req, res) => {
      await client.query('DELETE FROM entry;')

      await client.query('DELETE FROM category;')

      await client.query('DELETE FROM users;')

      console.log('db cleaned')
      res.send('db cleaned')
    }),
  )

  app.get(
    '/remove_user_data/:user_id',
    $(async (req, res) => {
      const user_id = Number(req.params.user_id)
      await client.query('DELETE FROM entry WHERE created_by = $1;', [user_id])

      await client.query('DELETE FROM category WHERE created_by = $1;', [
        user_id,
      ])

      await client.query('DELETE FROM users WHERE id = $1;', [user_id])

      console.log(`user ${user_id} data removed`)
      res.send('user data removed')
    }),
  )

  app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Something broke!')
  })

  app.use((req, res, next) => {
    console.log('helper server: sorry cant find that', req.url)
    res.status(404).send('Sorry cant find that!')
  })

  app.listen(process.env.PORT, () => {
    console.log('helper server: listening on ' + process.env.PORT)
  })
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

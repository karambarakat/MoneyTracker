/* eslint-env node */
import { assert } from 'console'
import express from 'express'
import { main } from './ephemeral-db.mjs'

if (process.env.NODE_ENV !== 'test') {
  throw new Error('this script is only for testing environments')
}

assert(process.env.PORT, 'no db provided')

const app = express()

app.get('/', (req, res) => {
  main().then(() => res.send('db deleted'))
})

app.listen(process.env.PORT, () => {
  console.log('listening on ' + process.env.PORT)
})

/* eslint-env node */
import { assert } from 'console'
import express from 'express'
import { connect_db } from './connect_db.mjs'

if (process.env.NODE_ENV !== 'test') {
  throw new Error('this script is only for testing environments')
}

assert(process.env.PORT, 'no db provided')

async function main() {
  const db = await connect_db()

  const app = express()

  app.get('/clean_db', async (req, res) => {
    await db.dropDatabase()
    console.log('db cleaned')
    res.send('db cleaned')
  })

  app.get('/remove_user_data/:user_id', async (req, res) => {
    await db.collection('users').deleteOne({ _id: req.params.user_id })
    await db.collection('logs').deleteMany({ user_id: req.params.user_id })
    await db
      .collection('categories')
      .deleteMany({ user_id: req.params.user_id })

    console.log(`user ${req.params.user_id} data removed`)
    res.send(`user ${req.params.user_id} data removed`)
  })

  app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Something broke!')
  })

  app.use((req, res, next) => {
    console.log('sorry cant find that')
    res.status(404).send('Sorry cant find that!')
  })

  app.listen(process.env.PORT, () => {
    console.log('listening on ' + process.env.PORT)
  })
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

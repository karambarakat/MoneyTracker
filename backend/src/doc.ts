import redoc from 'redoc-express'
import express from 'express'
import log from '@utils/log'
const doc = express.Router()

doc.use('/swagger.json', (req, res) => {
  res.sendFile('./static/swagger.json', { root: './src' })
})
doc.use(
  '/ui',
  redoc({
    title: 'API Docs',
    specUrl: '/doc/swagger.json',
  })
)

export { doc }

async function main() {
  const PORT = 8811
  const app = express()
  app.get('/', (_, res) => res.redirect('/doc/ui'))
  app.use('/doc', doc)
  app.listen(PORT, () =>
    log({ name: 'doc', color: 'magenta' }, `listening at port ${PORT}`)
  )
}

if (module.id === '.') {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

import redoc from 'redoc-express'
import express from 'express'
import openapi from 'openapi'

const doc = express.Router()

doc.use('/swagger.json', (req, res) => {
  res.json(openapi)
})

doc.use(
  '/docs',
  redoc({
    title: 'API Docs',
    specUrl: '/swagger.json',
  })
)

export { doc }

async function main() {
  const PORT = 8811
  const app = express()
  app.use(doc)
  app.get('*', (_, res) => res.redirect('/docs'))
  app.listen(PORT, () =>
    console.log(`listening at port ${PORT}`)
  )
}

if (module.id === '.') {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

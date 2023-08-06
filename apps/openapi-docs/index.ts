import redoc from 'redoc-express'
import express from 'express'
import openapi from 'types/dist/openapi.json'

const doc = express.Router()

const specUrl = '/swagger.json'

doc.use(specUrl, (req, res) => {
  res.json(openapi)
})

doc.use(
  '/docs',
  redoc({
    title: 'API Docs',
    specUrl,
  }),
)

export { doc }

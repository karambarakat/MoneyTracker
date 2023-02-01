const swaggerJsdoc = require('swagger-jsdoc')
const YAML = require('yaml')
const { writeFile, readFile } = require('fs/promises')

const glob = require('glob')
const merge = require('lodash.merge')

async function main() {
  /**
   * @type {string[]}
   */
  const paths = await new Promise((res, rej) =>
    glob('./src/**/*.openapi.yaml', (e, m) => (e ? rej() : res(m)))
  )

  const d1 = paths.map((path) => readFile(path))
  const d2 = await Promise.all(d1)
  const d3 = d2.map((b) => YAML.parse(b.toString()))
  const v = d3[0]?.openapi || '3.0.0'
  d3.forEach((next) => {
    if (next?.openapi !== v) {
      throw new Error('all .openapi.yaml has to have same openapi version')
    }
  })
  const d0 = d3.reduce((acc, n) => merge(acc, n), {})

  delete d0.paths

  const options = {
    definition: d0,
    apis: ['./src/**/*.ts'], // files containing block annotations @openapi or @swagger
  }

  const specification = swaggerJsdoc(options)
  const swaggerYaml = YAML.stringify(specification)
  const swaggerJSON = JSON.stringify(specification, null, ' ')

  await writeFile('swagger.yaml', swaggerYaml)
  await writeFile('src/swagger.json', swaggerJSON)
}

main()
  .then(() => console.log('success'))
  .catch((e) => console.log(e))

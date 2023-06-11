// @ts-check
const swaggerJsdoc = require('swagger-jsdoc')
const Parser = require('@apidevtools/swagger-parser')

const YAML = require('yaml')
const { writeFile, readFile } = require('fs/promises')

const merge = require('lodash.merge')
const childProcess = require('child_process')
const { yaml: yaml } = require('./_import')

async function main() {
  const yamlFiles = await yaml()

  const definitions = await Promise.all(
    yamlFiles.map(c => Parser.dereference(c)),
  ).catch(e => {
    console.error('Error: failed to bundle all openapi/**/*.yaml files')
    throw new Error(e)
  })

  /**
   * @type {{
   *  openapi: string
   *  info: {
   *    title: string
   *    version: string
   *  }
   *  paths: any
   * }}
   */
  const basicDef = YAML.parse(
    (await readFile('./src/info.yaml').catch(r => '')).toString('utf-8'),
  )

  const definition = merge(
    definitions.reduce((acc, next) => merge(acc, next), {}),
    basicDef,
  )

  const options = {
    definition,
    apis: ['./src/**/*.ts'], // files containing block annotations @openapi or @swagger
  }

  const specification = swaggerJsdoc(options)
  const swaggerYaml = YAML.stringify(specification)
  const swaggerJSON = JSON.stringify(specification, null, ' ')

  await writeFile('./dist/openapi.yaml', swaggerYaml)
  await writeFile('./dist/openapi.json', swaggerJSON)
  console.log('generated openapi.yaml, openapi.json')
}

main()
  .then(() => console.log('openapi: build: done'))
  .catch(e => {
    console.log('openapi: build: Error:', e)
    process.exit(1)
  })

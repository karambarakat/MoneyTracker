// @ts-check
const swaggerJsdoc = require('swagger-jsdoc')
const Parser = require('@apidevtools/swagger-parser')

const YAML = require('yaml')
const { writeFile, readFile } = require('fs/promises')

const glob = require('glob')
const merge = require('lodash.merge')
const childProcess = require('child_process')

async function main() {
  /**
   * @type {string[]}
   */
  const yamlFiles = await new Promise((res, rej) => {
    glob.glob('./src/**/*.yaml', function (e, files) {
      if (e) rej(e)
      res(files)
    })
  })

  await Promise.all(yamlFiles.map((c) => Parser.validate(c))).catch((e) => {
    console.error('Error: failed to validating all openapi/**/*.yaml files')
    throw new Error(e)
  })

  const definitions = await Promise.all(
    yamlFiles.map((c) => Parser.dereference(c))
  ).catch((e) => {
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
    (await readFile('./src/info.yaml').catch((r) => '')).toString(
      'utf-8'
    )
  )

  const definition = merge(
    definitions.reduce((acc, next) => merge(acc, next), {}),
    basicDef
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

  /**
   * validate using openapi-generator-cli to make sure no errors when generating templates
   */
  await /** @type {Promise<void>} */(new Promise((res, rej) => {
    childProcess.exec('npx openapi-generator-cli validate -i dist/openapi.yaml', (err, out, stderr) => {
      if (err || stderr) {
        console.log(stderr)
        rej()
      }
      res()
    })
  }))

  await /** @type {Promise<void>} */(new Promise((res, rej) => {
    childProcess.exec('npx openapi-generator-cli generate -g markdown -i dist/openapi.yaml -o dist/md-docs', (err, out, stderr) => {
      if (err || stderr) {
        console.log(stderr)
        rej()
      }
      console.log('generated dir md-docs')
      res()
    })
  }))
}

main()
  .then(() => console.log('success'))
  .catch((e) => console.log('Error:', e))

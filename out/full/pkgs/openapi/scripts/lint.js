// @ts-check
const { yaml } = require('./_import')
const Parser = require('@apidevtools/swagger-parser')

async function main() {
  const yamlFiles = await yaml()

  await Promise.all(yamlFiles.map(c => Parser.validate(c))).catch(e => {
    console.error('Error: failed to validating all openapi/**/*.yaml files')
    throw new Error(e)
  })
}

main()
  .then(() => console.log('openapi: linting: done'))
  .catch(e => {
    console.log('openapi: linting: Error:', e)
    process.exit(1)
  })

// @ts-check
// todo: CI Error: 404 Not Found - GET https://registry.npmjs.org/openapi-generator-cli - Not found
const childProcess = require('child_process')
async function main() {
  /**
   * validate using openapi-generator-cli to make sure no errors when generating templates
   */
  await /** @type {Promise<void>} */ (
    new Promise((res, rej) => {
      childProcess.exec(
        'npx openapi-generator-cli validate -i dist/openapi.yaml',
        (err, out, stderr) => {
          if (err || stderr) {
            console.log(stderr)
            rej(stderr)
          }
          res()
        }
      )
    })
  )
}

main()
  .then(() => {
    console.log('openapi: validate: done')
  })
  .catch(e => {
    console.log('openapi: validate: Error:', e)
    process.exit(1)
  })

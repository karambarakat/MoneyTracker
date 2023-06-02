// @ts-check
const glob = require('glob')

/**
 * @type {() => Promise<string[]>}
 */
const yamlFiles = () =>
  new Promise((res, rej) => {
    glob.glob('./src/**/*.yaml', function (e, files) {
      if (e) rej(e)
      res(files)
    })
  })

module.exports = {
  yamlFiles
}

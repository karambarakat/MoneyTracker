// @ts-check
const glob = require('glob')

/**
 * @type {() => Promise<string[]>}
 */
const yaml = () =>
  new Promise((res, rej) => {
    glob.glob('./src/**/*.yaml', function (e, files) {
      if (e) rej(e)
      res(files)
    })
  })

module.exports = {
  yaml
}

#!/usr/bin/env node
// @ts-check
const yargs = require('yargs/yargs')(process.argv.slice(2))
const path = require('path')
const shx = require('shelljs')

const yarg = yargs
  .demandCommand(
    0,
    0,
    'provide no positional argument',
    'provide less positional argument'
  )
  .options('dir', {
    default: './terraform',
    type: 'string',
    requiresArg: true,
    desc: 'directory contains all .tf configurations',
  })

async function main() {
  /**
   * @type {string}
   */
  // @ts-ignore
  const dir = path.resolve('./', yarg.argv.dir)

  if (!shx.test('-d', dir)) {
    throw new Error("--dir either doesn't exists or not a valid directory")
  }

  if (!shx.ls(dir).some((path) => path.includes('.tf'))) {
    throw new Error('there is no any .tf files in ' + dir)
  }
}

main()
  .then((e) => console.log('bingo'))
  .catch((e) => console.log('\n', (e.message && e.message) || e))

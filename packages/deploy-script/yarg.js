const yargs = require('yargs/yargs')(process.argv.slice(2))

const myYarg = yargs
  .demandCommand(
    0,
    0,
    'provide no positional argument',
    'provide less positional argument'
  )
  .options('appName', {
    type: 'string',
    demandOption: true,
  })
  .options('working_dir', {
    default: '.',
    type: 'string',
    demandOption: true,
    desc: 'directory contains all .tf configurations',
  })
  .options('zip_dir', {
    default: './terraform',
    type: 'string',
    describe:
      'what directory will be send to the cloud, default `./terraform` but you can specify `./` to send the entire working directory, note `../` is not tested yet but should work',
    coerce: (val) => {
      return path.join(process.cwd(), val).replace(process.cwd(), '.')
    },
  })

exports.yarg = myYarg
/**
 * @type {{_: unknown[]} & ((typeof myYarg) extends import("yargs").Argv<infer I> ? I : never)}
 */
// @ts-ignore
const argv = myYarg.argv

exports.argv = argv

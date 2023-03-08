#!/usr/bin/env node
// @ts-check
const yargs = require('yargs/yargs')(process.argv.slice(2))
const path = require('path')
const shx = require('shelljs')
const tar = require('tar')

async function main() {
  const { default: _fetch, Headers } = (await import('node-fetch'))
  /**
   * @type {(...args: Parameters<_fetch>) => Promise<safeAny>}
   */
  const fetch = (...args) => _fetch(...args).then(json)
  const json = (/** @type {{ json: () => any; }} */ val) => val.json()
  /**
   * @type {{_: unknown[]} & ((typeof yarg) extends import("yargs").Argv<infer I> ? I : never)}
   */
  // @ts-ignore
  const argv = yarg.argv

  const { working_dir, appName, v, zip_dir } = argv

  const working_dir_f = path.join(zip_dir, working_dir)
  test_if_tf_files_exist(working_dir_f)

  const workspace = (`tcicd-${organization}-${appName}-${env}-${v}`).toLowerCase().replace('_', '-')

  // look up the workspace id
  var res = await fetch(`https://app.terraform.io/api/v2/organizations/${organization}/workspaces/${workspace}`, {
    headers: new Headers({
      Authorization: "Bearer " + token,
      "Content-Type": "application/vnd.api+json"
    }),
  })

  // or create new one
  if (typeof res?.errors?.some === 'function' && res.errors.some(e => e.status === "404")) {
    res = await fetch(`https://app.terraform.io/api/v2/organizations/${organization}/workspaces`, {
      method: "POST",
      body: JSON.stringify({
        data: {
          type: "workspaces",
          attributes: {
            name: workspace,
            "working-directory": working_dir_f
          }
        }
      }),
      headers: new Headers({
        Authorization: "Bearer " + token,
        "Content-Type": "application/vnd.api+json"
      }),
    })
  }

  if (res?.success === false)
    err("failed to given fetch workspace", res)

  const id = res?.data?.id || err("no data.id")

  res = await fetch(`https://app.terraform.io/api/v2/workspaces/${id}/configuration-versions`, {
    method: "POST",
    body: '{"data":{"type":"configuration-versions"}}',
    headers: new Headers({
      Authorization: "Bearer " + token,
      "Content-Type": "application/vnd.api+json"
    }),
  })
  /**
   * @type {string}
   */
  const uploadUrl = res?.data?.attributes?.['upload-url'] || err('.data.attributes."upload-url"')

  const res2 = await _fetch(uploadUrl, {
    method: "PUT",
    body: tar.c(
      {
        gzip: true,
      }, [path.join(process.cwd(), zip_dir).replace(process.cwd(), ".")]
    ),
    headers: new Headers({
      Authorization: "Bearer " + token,
      "Content-Type": "application/vnd.api+json"
    }),
  })

  if (!res2.ok)
    err("failed to upload the configuration", res2)
}

/**
 * prints extra argument and can be use as expression instead of `throw new Error()` statement 
 * @type {(m: string, ...rest: any[])=> any}
 */
const err = (m, ...rest) => { console.log(m, ...rest); throw new Error(m) }
/**
 * possible undefined but can be optionally chained
 * i.e. :give an error when you try to access property but works fine when you use optional chaining
 * note: this is how optional chaining shoud work with `unknown` but idw and I don`t wanna bother
 * @example safeAny.hi.hi.hi.hi // error
 * @example safeAny?.hi?.hi?.hi?.hi // works
 * @example safeAny?.hi === "random" // works
 * @typedef {undefined | ({[k: string]: safeAny} & (boolean | string | number | function))} safeAny 
 */

const token = process.env.TF_Token || err("`TF_Token` was not provided as environment variable")
const env = process.env.NODE_ENV || "default"
const organization = process.env.TF_Organization || err("`TF_Organization` was not provided as environment variable")

const yarg = yargs
  .demandCommand(
    0,
    0,
    'provide no positional argument',
    'provide less positional argument'
  )
  .options("appName", {
    type: "string",
    demandOption: true,
  })
  .options('working_dir', {
    default: '.',
    type: 'string',
    demandOption: true,
    desc: 'directory contains all .tf configurations',
  })
  .options('v', {
    default: 'vx',
    type: "string",
    describe: 'deployment verstion'
  })
  .options('zip_dir', {
    default: './terraform',
    type: "string",
    describe: 'what directory will be send to the cloud, default `./terraform` but you can specify `./` to send the entire working directory, note `../` is not tested yet but should work',
    coerce: (val) => {
      return path.join(process.cwd(), val).replace(process.cwd(), ".")
    }
  })

function test_if_tf_files_exist(val) {
  const dir = path.resolve('./', val)
  if (!shx.test('-d', dir)) {
    throw new Error("--dir either doesn't exists or not a valid directory")
  }

  if (!shx.ls(dir).some((path) => path.includes('.tf'))) {
    throw new Error('there is no any .tf files in ' + dir)
  }
}

main()
  .then((e) => console.log('bingo'))
  .catch((e) => console.log('\n', e.message || e))

#!/usr/bin/env node
// @ts-check
const path = require('path')
const tar = require('tar')
const { test_if_tf_files_exist } = require('./utils/test_if_tf_files_exist.js')
const { err } = require('./utils/err.js')
const { parseEnv } = require('./utils/parseEnv.js')
const { fetch, _fetch: _fetchwait } = require('./utils/fetch.js')
const { argv, yarg } = require('./yarg.js')

async function main() {
  const _fetch = await _fetchwait
  const { env, organization, token, v } = parseEnv()

  const { working_dir, appName, zip_dir } = argv

  const working_dir_f = path.join(zip_dir, working_dir)
  test_if_tf_files_exist(working_dir_f)

  const workspace = `tcicd-${organization}-${appName}-${env}-${v}`
    .toLowerCase()
    .replace('_', '-')

  // look up the workspace id
  var res = await fetch(
    `https://app.terraform.io/api/v2/organizations/${organization}/workspaces/${workspace}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/vnd.api+json',
      },
    }
  )

  // or create new one
  const ifError = await res.get((v) => v?.errors)
  if (
    typeof ifError?.some === 'function' &&
    ifError.some((e) => e.status === '404')
  ) {
    res = await fetch(
      `https://app.terraform.io/api/v2/organizations/${organization}/workspaces`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            type: 'workspaces',
            attributes: {
              name: workspace,
              'working-directory': working_dir_f,
            },
          },
        }),
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/vnd.api+json',
        },
      }
    )
  }

  const success = await res.get((v) => v?.success === false)

  if (success) err('failed to given fetch workspace', res)

  // get id
  const id = await res.get((val) => val?.data?.id)

  id || err('no `data.id`', res)

  // prepare to upload configuration
  res = await fetch(
    `https://app.terraform.io/api/v2/workspaces/${id}/configuration-versions`,
    {
      method: 'POST',
      body: '{"data":{"type":"configuration-versions"}}',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/vnd.api+json',
      },
    }
  )

  const uploadUrl = await res.get((v) => v?.data?.attributes?.['upload-url'])
  uploadUrl || err('no `.data.attributes."upload-url"`', await res.json())

  const res2 = await _fetch(uploadUrl, {
    method: 'PUT',
    body: tar.c(
      {
        gzip: true,
      },
      [path.join(process.cwd(), zip_dir).replace(process.cwd(), '.')]
    ),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/vnd.api+json',
    },
  })

  if (!res2.ok) err('failed to upload the configuration', res2)
}

main().then((e) => console.log('bingo'))

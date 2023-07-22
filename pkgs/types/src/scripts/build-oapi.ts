import { OpenAPIV3 } from 'openapi-types'
import * as oapi from '../openapi/index'
import set from 'lodash/set'
import capitalize from 'lodash/capitalize'
import YAML from 'yaml'
import writeFile from '../utils/writeFile'
import Ajv from 'ajv'
import { getRefs } from '../utils/json-traverse'
import readFilesFromDir from '../utils/readFilesFromDir'

const initial = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
  },
  paths: {},
  components: {},
} satisfies OpenAPIV3.Document

async function main() {
  for (const op of Object.values(oapi)) {
    for (const { path, obj } of Object.values(op)) {
      for (const ref of getRefs(obj)) {
        const oldRef = ref.$ref
        const newRef = oldRef
          .split('/')
          .map(e => capitalize(e))
          .join('')
        ref.$ref = '#/components/schemas/' + newRef

        set(initial, 'components.schemas.' + newRef, await resolve(oldRef))
      }
      set(initial, path, obj)
    }
  }
  // this will throw because of
  // some incompatibility that I'm not sure if needed to fix or not
  // await Parser.validate(initial).catch(err => {
  //   console.error(Array.from(err))
  //   throw new Error('invalid openapi')
  // })

  writeFile('./dist/openapi.yaml', YAML.stringify(initial))
  writeFile('./dist/openapi.json', JSON.stringify(initial))
  console.log('file written ./dist/openapi.{yaml | json}')
}

const ajv = new Ajv({
  schemas: readFilesFromDir<{ $id: string }>('./dist/json', ({ out }) =>
    JSON.parse(out),
  ),
})

async function resolve(ref: string) {
  const res = ajv.getSchema('https://backend-json.pocket-app.karam.page' + ref)

  if (!res) return {}

  set(res, 'schema.$id', undefined)
  set(res, 'schema.$schema', undefined)

  return res.schema
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

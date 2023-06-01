import schemas from '../../json-schema'
import _ from 'lodash'
import deasync from 'deasync'
import { exec } from 'child_process'

import { traverse as traverse_error } from '../extension/x-error'
import { traverse as traverse_relation } from '../extension/x-relation'
import deasyncFn from '../../utils/deasync'
import schemaInterface from '../../utils/schemaInterface'

export type schemas = typeof schemas extends Array<infer S>
  ? S extends { $id: string }
    ? S
    : never
  : never

type select<str> = str extends `http://ex.ample${infer N}` ? N : never

export type schema_r = select<schemas['$id']>

const thisSchema = new schemaInterface(schemas, {
  traverse: [traverse_error, traverse_relation],
  prefix: 'http://ex.ample',
})

export const getSchemaAsync = thisSchema.get.bind(thisSchema)

export default deasyncFn(getSchemaAsync)

// alternative to the default export
export function deAsyncCli($ref: schema_r, anchor?: string) {
  // this another workaround for the sync/async problem
  // this synchronous solution may sound stupid, but (unlike the default export) it works in case of jest testing for unknown reason
  const clg = deasync(exec)(
    `ts-node lib/openapi/getSchemaCli.ts ///___${$ref} ///___${anchor || ''}`
  ) //I had to add `///__` at the being to to work with `process.argv`. this is not the cleanest code but it avoids weird behavior with `/` and `#`
  const schema = JSON.parse(clg as string)
  return schema
}

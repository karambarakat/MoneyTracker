import ajv from 'ajv'
import extendedSchema, { formats } from '../lib/extension'
import * as _requests from './requests/index'
import * as _modules from './modules/index'
import * as _errors from './restErrors/index'

const schemas = [
  ...Object.values(_requests),
  ...Object.values(_modules),
  ...Object.values(_errors),
]

export default schemas

const set = new Set()

const isValid = new ajv({
  allowUnionTypes: true,
  formats,
}).compile(extendedSchema)

for (const schema of schemas) {
  if (!schema.$id) throw new Error('missing $id')

  if (set.has(schema.$id)) throw new Error('duplicate id')
  set.add(schema.$id)

  if (!isValid(schema)) {
    // @ts-ignore
    console.log(schema.$id, isValid.errors)
    throw new Error('invalid schema')
  }
}

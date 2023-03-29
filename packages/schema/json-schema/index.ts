// @ts-check
import * as reqs from './requests/index'
import * as modules from './modules/index'
import * as errors from './restErrors/index'

const dirs = {
  reqs,
  modules,
  errors,
}

import ajv from 'ajv'
import extendedSchema, { formats } from './extendedSchema'

// this is just to valid the schemas
// todo: test: check for unknown keywords
const isValid = new ajv({
  allowUnionTypes: true,
  formats,
}).compile(extendedSchema)

export default () => {
  const set = new Set()
  return Array.from(
    (function* () {
      for (const [_1, dir] of Object.entries(dirs)) {
        for (const [_2, file] of Object.entries(dir)) {
          for (const [_3, schema] of Object.entries(file)) {
            if (!schema.$id) er('missing $id')
            if (set.has(schema.$id)) er('duplicate id')
            set.add(schema.$id)
            if (!isValid(schema)) er('invalid schema', isValid.errors)
            // console.log({ schema })
            yield schema

            function er(str, ...args) {
              const err = new Error(
                `json-schema: ${str} id ${schema.$id} for ${_1}/${_2}/${_3}`
              )
              // @ts-ignore
              err.info = args
              throw err
            }
          }
        }
      }
    })()
  )
}
export { reqs, modules, errors }

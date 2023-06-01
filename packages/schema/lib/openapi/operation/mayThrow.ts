import { OpenAPIV3 as v3 } from 'openapi-types'
import schemas from '../../../json-schema'
import type { schemas as schemaType, schema_r } from '../getSchema'
import { docType } from '../proxy'
import { getStatus } from '../../restError'

type error<str> = str extends `/errors/${infer N}` ? N : never

export type option = {
  type: 'mayThrow'
  error: error<schema_r>
}

function mayThrow(
  op: v3.OperationObject,
  options: option,
  trap: { path: (string | number | Symbol)[]; rootDoc: docType }
) {
  const error = schemas.find(
    (e) => e.$id === `http://ex.ample/errors/${options.error}`
  )

  if (!error) throw new Error('cannot fine error with name of ' + options.error)

  if (!('description' in error)) {
    // did you change the implementation of `lib\restError.ts`
    throw new Error('this function might need to be reimplemented')
  }
  const errorId = 'error' + new URL(error.$id).pathname.replace(/\//g, '_')

  const code = getStatus(error)

  Reflect.deleteProperty(error, 'x-error')

  // todo: addComponent
  // syntax suggestion: op.parameters = _.build([{type: 'asComponent', value : {...}}])
  trap.rootDoc.components.responses[errorId] = {
    description: error.description,
    content: {
      'application/json': {
        // @ts-ignore
        schema: error,
      },
    },
  }

  op.responses[code] = {
    $ref: `#/components/responses/${errorId}`,
  }
}

export default mayThrow

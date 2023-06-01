import { OpenAPIV3 as v3 } from 'openapi-types'
import { docType } from '../proxy'

export type option = {
  type: 'request'
  description?: string
  required?: boolean
  schema: v3.SchemaObject | { $ref: `mySchema::${string}` }
  mod?: {
    allOptional?: boolean
  }
}

function request(
  op: v3.OperationObject,
  options: option,
  trap: { path: (string | number | Symbol)[]; rootDoc: docType }
) {
  if ('$ref' in options.schema) {
    const ref = options.schema.$ref
    if (!ref.startsWith('mySchema::')) {
      throw new Error('request: only `mySchema::` refs are allowed')
    }

    ref === 'mySchema::sd'

    throw new Error('to be implemented')
  }

  op.requestBody = {
    description: options.description || '',
    required: options.required === undefined ? true : options.required,
    content: {
      'application/json': {
        schema: options.schema,
      },
    },
  }
}

export default request

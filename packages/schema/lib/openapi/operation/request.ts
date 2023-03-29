import { OpenAPIV3 as v3 } from 'openapi-types'

export type option = {
  type: 'request'
  description?: string
  required?: boolean
  schema: v3.SchemaObject | v3.ReferenceObject
  mod?: {
    allOptional?: boolean
  }
}

function request(
  op: v3.OperationObject,
  options: option,
  trap: { path: (string | number | Symbol)[]; rootDoc: v3.Document }
) {
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

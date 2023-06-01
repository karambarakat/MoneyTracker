import { OpenAPIV3 as v3 } from 'openapi-types'
import { docType } from '../proxy'

export type option = {
  type: 'update'
  schema: string
}

function update(
  op: v3.OperationObject,
  options: option,
  trap: { path: (string | number | Symbol)[]; rootDoc: docType }
) {
  op.requestBody = {
    description: `update ${options.schema} entity`,
    required: true,
    content: {
      'application/json': {
        schema: { $ref: `json-schema::${options.schema}::allOptional` },
      },
    },
  }

  op.responses[200] = {
    description: `update ${options.schema} entity`,
    content: {
      'application/json': {
        schema: { $ref: `json-schema::${options.schema}` },
      },
    },
  }
}

export default update

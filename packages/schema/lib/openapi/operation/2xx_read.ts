import { OpenAPIV3 as v3 } from 'openapi-types'
import { docType } from '../proxy'

export type option = {
  type: 'read'
  schema: string
  paged?: boolean
}

function read(
  op: v3.OperationObject,
  options: option,
  trap: { path: (string | number | Symbol)[]; rootDoc: docType }
) {
  op.responses[200] = {
    description: 'ok',
    content: {
      'application/json': {
        schema: options.paged
          ? { type: 'array', items: { $ref: `json-schema::${options.schema}` } }
          : { $ref: `json-schema::${options.schema}` },
      },
    },
  }
}

export default read

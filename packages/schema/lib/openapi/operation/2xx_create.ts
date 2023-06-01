import { OpenAPIV3 as v3 } from 'openapi-types'
import _ from '../builder'
import { docType } from '../proxy'

export type option = {
  type: 'create'
  schema: string
}

function create(
  op: v3.OperationObject,
  options: option,
  trap: { path: (string | number | Symbol)[]; rootDoc: docType }
) {
  op.requestBody = {
    description: `create new ${options.schema} entity`,
    required: true,
    content: {
      'application/json': {
        schema: { $ref: `json-schema::${options.schema}` },
      },
    },
  }

  // op = _.build([
  //   { type: 'mayThrow', error: 'e_400SomeFieldsRequired' },
  // ]) as Required<v3.OperationObject>

  op.responses[201] = {
    description: 'created',
    content: {
      'application/json': {
        schema: { $ref: `json-schema::${options.schema}` },
      },
    },
  }
}

export default create

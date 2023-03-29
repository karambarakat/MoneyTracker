import { OpenAPIV3 as v3 } from 'openapi-types'

export type option = {
  type: 'delete'
}

function delete_(
  op: v3.OperationObject,
  options: option,
  trap: { path: (string | number | Symbol)[]; rootDoc: v3.Document }
) {
  op.responses[204] = {
    description: 'no content',
    content: {
      'application/json': {
        // @ts-expect-error null is not assignable to array type
        schema: { type: 'null' },
      },
    },
  }
}

export default delete_

import { OpenAPIV3 as v3 } from 'openapi-types'
import * as errors from '../../../json-schema/restErrors/index'

export type option = {
  type: 'mayThrow'
  error: keyof typeof errors
}

function mayThrow(
  op: v3.OperationObject,
  options: option,
  trap: { path: (string | number | Symbol)[]; rootDoc: v3.Document }
) {
  const error = errors[options.error]

  if (!error)
    throw new Error(
      `openapiWrapper: Key ${String(options.error)} not found in errors`
    )

  const code = error.default['x-error'] || 400

  if (!error)
    throw new Error(
      `openapiWrapper: Key ${String(options.error)} not found in responses`
    )

  trap.rootDoc.components.responses[options.error] = {
    description: error.default.description,
    content: {
      'application/json': {
        // @ts-ignore
        schema: error.default,
      },
    },
  }

  // todo: addComponent
  // syntax suggestion: op.parameters = _.build([{type: 'asComponent', value : {...}}])
  op.responses[code] = {
    $ref: `#/components/responses/${options.error}`,
  }
}

export default mayThrow

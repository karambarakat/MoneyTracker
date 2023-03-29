import { OpenAPIV3 as v3 } from 'openapi-types'

export type option = {
  type: 'parameter'
  document: v3.ParameterObject
  referenced?: string
}

function parameter(
  op: v3.OperationObject,
  options: option,
  trap: { path: (string | number | Symbol)[]; rootDoc: v3.Document }
) {
  !op.parameters && (op.parameters = [])

  if (options.referenced) {
    trap.rootDoc.components.parameters[options.referenced] = options.document
    op.parameters.push({
      $ref: `#/components/parameters/${options.referenced}`,
    })
  } else {
    op.parameters.push(options.document)
  }
}

export default parameter

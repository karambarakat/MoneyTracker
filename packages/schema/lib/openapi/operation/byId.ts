import { OpenAPIV3 as v3 } from 'openapi-types'
import _ from '../builder'
import e404ResourceWasNotFound from '../../../json-schema/restErrors/e404ResourceWasNotFound'
import mayThrow from './mayThrow'

export type option = {
  type: 'byId'
}

function byId(
  op: v3.OperationObject,
  options: option,
  trap: { path: (string | number | Symbol)[]; rootDoc: v3.Document }
) {
  mayThrow(op, { type: 'mayThrow', error: 'e_404ResourceWasNotFound' }, trap)

  trap.rootDoc.components.parameters.id = {
    name: 'id',
    in: 'path',
    required: true,
    description:
      'grap entry by its id, should be place in path as in `to/path/:id/etc`',
    schema: { type: 'string', example: 'xxxxx' },
  }

  op.parameters = [
    {
      $ref: '#/components/parameters/id',
    },
  ]
}

export default byId

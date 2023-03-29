import { default as meta, option as metaOptions } from './meta'
import { default as security, option as securityOptions } from './security'
import { default as mayThrow, option as mayThrowOptions } from './mayThrow'
import { default as request, option as requestOptions } from './request'
import { default as byId, option as byIdOptions } from './byId'
import { default as read, option as readOptions } from './2xx_read'
import { default as create, option as createOptions } from './2xx_create'
import { default as update, option as updateOptions } from './2xx_update'
import { default as delete_, option as deleteOptions } from './2xx_delete'

import { OpenAPIV3 as v3 } from 'openapi-types'
import required from '../../required'

// see https://gist.github.com/karambarakat/b753999a9e7e3a34be137acb02ad01aa for more information
// todo: include this type in `../builder.ts`, TypeScript doesn't support augmentation for types like they do for interface
export type OperationStep =
  | { op: metaOptions; doc: v3.OperationObject }
  | { op: securityOptions; doc: v3.OperationObject }
  | { op: mayThrowOptions; doc: v3.OperationObject }
  | { op: requestOptions; doc: v3.OperationObject }
  | { op: byIdOptions; doc: v3.OperationObject }
  | { op: readOptions; doc: v3.OperationObject }
  | { op: createOptions; doc: v3.OperationObject }
  | { op: updateOptions; doc: v3.OperationObject }
  | { op: deleteOptions; doc: v3.OperationObject }

export default function buildOperation(
  steps: OperationStep['op'][],
  path: (string | Symbol | number)[],
  rootDoc: v3.Document
) {
  const newOp = { responses: {} } // required({ responses: {} } as v3.OperationObject, def)
  steps.forEach((step) => {
    step.type === 'meta' && meta(newOp, step, { path, rootDoc })
    step.type === 'security' && security(newOp, step, { path, rootDoc })
    step.type === 'mayThrow' && mayThrow(newOp, step, { path, rootDoc })
    step.type === 'request' && request(newOp, step, { path, rootDoc })
    step.type === 'byId' && byId(newOp, step, { path, rootDoc })
    step.type === 'read' && read(newOp, step, { path, rootDoc })
    step.type === 'create' && create(newOp, step, { path, rootDoc })
    step.type === 'update' && update(newOp, step, { path, rootDoc })
    step.type === 'delete' && delete_(newOp, step, { path, rootDoc })
  })
  return newOp
}

export function match(path: (string | number | Symbol)[]) {
  return path[0] === 'paths' && path.length === 3
}

const def: Required<v3.OperationObject> = {
  responses: {},
  callbacks: {},
  deprecated: false,
  description: '',
  externalDocs: {} as v3.OperationObject['externalDocs'] & {},
  operationId: '',
  parameters: [],
  requestBody: {} as v3.OperationObject['requestBody'] & {},
  security: [],
  servers: [],
  summary: '',
  tags: [],
}

/// <reference path="../../index.d.ts" />
// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/restErrors/ResourceWasNotFound',
  required: ['status', 'name', 'message', 'details'],
  type: 'object',
  description: "requested resource doesn't exist",
  properties: {
    status: { type: 'number', default: 404 },
    name: { type: 'string', default: 'ResourceWasNotFound' },
    message: { type: 'string' },
    details: { type: 'null' },
  },
  additionalProperties: false,
}

/// <reference path="../../index.d.ts" />
// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/restErrors/UserAlreadyExist',
  required: ['status', 'name', 'message', 'details'],
  type: 'object',
  description: 'User already exist',
  properties: {
    status: { type: 'number', default: 409 },
    name: { type: 'string', default: 'UserAlreadyExist' },
    message: { type: 'string' },
    details: { type: 'null' },
  },
  additionalProperties: false,
}

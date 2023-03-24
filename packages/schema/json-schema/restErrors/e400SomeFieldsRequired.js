/// <reference path="../../index.d.ts" />
// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/restErrors/SomeFieldsRequired',
  required: ['status', 'name', 'message', 'details'],
  type: 'object',
  description: 'email/password were/was wrong or not provided',
  properties: {
    status: { type: 'number', default: 400 },
    name: { type: 'string', default: 'SomeFieldsRequired' },
    message: { type: 'string' },
    details: { type: 'null' },
  },
  additionalProperties: false,
}

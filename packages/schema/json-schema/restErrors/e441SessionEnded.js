/// <reference path="../../index.d.ts" />
// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/restErrors/SessionEnded',
  required: ['status', 'name', 'message', 'details'],
  type: 'object',
  description: 'the token/session has expired, login again',
  properties: {
    status: { type: 'number', default: 441 },
    name: { type: 'string', default: 'SessionEnded' },
    message: { type: 'string' },
    details: {
      type: 'object',
      required: ['expiredAt'],
      properties: {
        expiredAt: { type: 'string', examples: ['2023-02-03T09:06:50.000Z'] },
      },
    },
  },
  additionalProperties: false,
}

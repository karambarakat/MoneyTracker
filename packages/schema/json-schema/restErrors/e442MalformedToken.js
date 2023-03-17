// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/restError/MalformedToken',
  required: ['status', 'name', 'message', 'details'],
  type: 'object',
  description: 'the token is either corrupted or invalid',
  properties: {
    status: { type: 'number', default: 442 },
    name: { type: 'string', default: 'MalformedToken' },
    message: { type: 'string' },
    details: {
      type: 'object',
      required: ['name', 'message'],
      properties: {
        name: {
          type: 'string',
          enum: [
            'JsonWebTokenError',
            'TokenExpiredError',
            'NoTokenWasProvide',
            'UnspecifiedError',
          ],
          default: 'JsonWebTokenError',
        },
        message: { type: 'string' },
        date: { type: 'string' },
      },
    },
  },
}

/// <reference path="../../index.d.ts" />
// @ts-check

import restError from '../../src/wrappers/restError.js'

/**
 * @type {import("json-schema").JSONSchema7}
 */
export default restError(
  442,
  'MalformedToken',
  'the token is either corrupted or invalid',
  {
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
  }
)

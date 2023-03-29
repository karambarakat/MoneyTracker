/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'
import restError from '../../lib/restError'

const status = 401

export default restError(
  status,
  'BearerTokenFailed',
  'Token was invalid or expired, please login again',
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
) satisfies JSONSchema7

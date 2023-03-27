/// <reference path="../../index.d.ts" />
// @ts-check

import restError from '../../src/wrappers/restError.js'

export default restError(
  441,
  'SessionEnded',
  'the token/session has expired, login again',
  {
    type: 'object',
    required: ['expiredAt'],
    properties: {
      expiredAt: { type: 'string', examples: ['2023-02-03T09:06:50.000Z'] },
    },
  }
)

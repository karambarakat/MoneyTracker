/// <reference path="../../index.d.ts" />
// @ts-check

import restError from '../../src/wrappers/restError.js'

export default restError(
  404,
  'ResourceWasNotFound',
  "requested resource doesn't exist",
  null
)

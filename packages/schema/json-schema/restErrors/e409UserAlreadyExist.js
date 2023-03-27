/// <reference path="../../index.d.ts" />
// @ts-check

import restError from '../../src/wrappers/restError.js'

export default restError(
  409,
  'UserAlreadyExist',
  'User already exist, try to login',
  null
)

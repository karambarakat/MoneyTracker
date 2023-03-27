/// <reference path="../../index.d.ts" />
// @ts-check

import restError from '../../src/wrappers/restError.js'

export default restError(
  401,
  'UnAuthorized',
  'email/password were/was wrong or not matching',
  null
)

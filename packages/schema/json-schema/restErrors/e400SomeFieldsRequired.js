/// <reference path="../../index.d.ts" />
// @ts-check

import restError from '../../src/wrappers/restError.js'

export default restError(
  400,
  'SomeFieldsRequired',
  'email/password were/was wrong or not provided'
)

/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'
import restError from '../../lib/restError'
const status = 401

export default restError(
  status,
  'BasicTokenFailed',
  'email/password were/was wrong or not matching',
  null
) satisfies JSONSchema7

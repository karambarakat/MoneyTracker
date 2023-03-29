/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'
import restError from '../../lib/restError'

export default restError(
  400,
  'SomeFieldsRequired',
  'email/password were/was wrong or not provided'
) satisfies JSONSchema7

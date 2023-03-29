/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'
import restError from '../../lib/restError'

const status = 401

export default restError(
  status,
  'EmailOrPasswordIncorrect',
  'email/password were/was wrong or not provided',
  null
) satisfies JSONSchema7

/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'
import restError from '../../lib/restError'

const status = 401

export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://ex.ample/errors/EmailOrPasswordIncorrect' as const,
  ...restError(
    status,
    'EmailOrPasswordIncorrect',
    'email/password were/was wrong or not provided',
    null
  ),
} satisfies JSONSchema7

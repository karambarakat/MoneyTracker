/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'
import restError from '../../lib/restError'

export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://ex.ample/errors/SomeFieldsRequired' as const,
  ...restError(
    400,
    'SomeFieldsRequired',
    "email/password combination doesn't exist"
  ),
} satisfies JSONSchema7

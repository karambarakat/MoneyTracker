/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'
import restError from '../../lib/restError'
const status = 401

export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://ex.ample/errors/BasicTokenFailed' as const,
  ...restError(
    status,
    'BasicTokenFailed',
    'authorization token was corrupted or not provided'
  ),
} satisfies JSONSchema7

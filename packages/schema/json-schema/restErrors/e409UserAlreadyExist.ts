/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'
import restError from '../../lib/restError'

const status = 409

export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://ex.ample/errors/UserAlreadyExist' as const,
  ...restError(
    status,
    'UserAlreadyExist',
    'User already exist, try to login',
    null
  ),
} satisfies JSONSchema7

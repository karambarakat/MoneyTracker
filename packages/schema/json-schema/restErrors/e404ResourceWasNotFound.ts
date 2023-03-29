/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'
import restError from '../../lib/restError'

const status = 404

export default restError(
  status,
  'ResourceWasNotFound',
  "requested resource doesn't exist",
  null
) satisfies JSONSchema7

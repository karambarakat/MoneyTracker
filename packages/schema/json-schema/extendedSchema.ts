// @ts-check
// todo: stupid JavaScript: I cant use assert in testing
import schema7 from 'ajv/lib/refs/json-schema-draft-07.json' assert { type: 'json' }
import { jsonSchema as xError } from '../lib/schema/x-error.js'
import { jsonSchema as xRelation } from '../lib/schema/x-relation.js'

export const formats = {
  email: /$/,
  'uri-reference': /$/,
  uri: /$/,
  regex: /$/,
}

export default {
  ...schema7,
  $id: 'json',
  properties: {
    ...schema7.properties,
    'x-relation': xRelation,
    'x-error': xError,
  },
  additionalProperties: false,
}

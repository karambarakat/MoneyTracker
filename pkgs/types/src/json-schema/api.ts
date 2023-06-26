import { JSONSchema7 } from 'json-schema'

export const jwt_payload = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: '/jwt' as const,
  type: 'object',
  properties: {
    _id: { type: 'string' },
    email: { type: 'string' },
    exp: { type: 'number' },
    iat: { type: 'number' },
  },
  required: ['_id', 'email', 'exp', 'iat'],
  additionalProperties: false,
} satisfies JSONSchema7

export const api_google_callback_params = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: '/api_google_callback_params' as const,
  type: 'object',
  properties: {
    token: { type: 'string' },
    displayName: { type: 'string' },
    _id: { type: 'string' },
  },
  required: ['token', 'displayName', '_id'],
  additionalProperties: false,
} satisfies JSONSchema7

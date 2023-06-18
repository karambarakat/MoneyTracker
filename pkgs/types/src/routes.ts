import { JSONSchema7 } from 'json-schema'

export const email_status = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/routes/email_status',
  type: 'object',
  properties: {
    email: { type: 'string' },
  },
  required: ['email'],
  additionalProperties: false,
} satisfies JSONSchema7

export const profile_update = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/routes/profile_update',
  type: 'object',
  properties: {
    displayName: { type: 'string' },
    picture: { type: 'string' },
  },
  required: [],
  additionalProperties: false,
} satisfies JSONSchema7

export const updatePassword_nolocal = {
  $schema: 'http://json-schema.org/draft-07/schema#',

  $id: 'https://example.com/routes/updatePassword_nolocal',
  type: 'object',
  properties: {
    newPassword: { type: 'string' },
  },
  required: ['newPassword'],
  additionalProperties: false,
} satisfies JSONSchema7

export const updatePassword_local = {
  $schema: 'http://json-schema.org/draft-07/schema#',

  $id: 'https://example.com/routes/updatePassword_local',
  type: 'object',
  properties: {
    oldPassword: { type: 'string' },
    newPassword: { type: 'string' },
  },
  required: ['oldPassword', 'newPassword'],
  additionalProperties: false,
} satisfies JSONSchema7

export const auth_local_register = {
  $schema: 'http://json-schema.org/draft-07/schema#',

  $id: 'https://example.com/routes/auth_local_register',
  type: 'object',
  properties: {
    displayName: { type: 'string' },
  },
  required: [],
  additionalProperties: false,
} satisfies JSONSchema7

export const auth_local_login = {
  $schema: 'http://json-schema.org/draft-07/schema#',

  $id: 'https://example.com/routes/auth_local_login',
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
} satisfies JSONSchema7

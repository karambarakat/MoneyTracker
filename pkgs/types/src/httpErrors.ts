import type { JSONSchema7 } from 'json-schema'

export const FieldsRequired = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/httpErrors/FieldsRequired',
  type: 'object',
  properties: {
    status: { const: 400 },
    name: { const: 'SomeFieldsRequired' },
    message: { type: 'string' },
    details: {
      type: 'object',
      properties: {
        errors: {
          type: 'object',
          additionalProperties: { type: 'string' },
        },
      },

      required: ['errors'],
      additionalProperties: false,
    },
  },
  required: ['status', 'name', 'message', 'details'],
  additionalProperties: false,
} satisfies JSONSchema7

export const EmailOrPasswordIncorrect = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/httpErrors/EmailOrPasswordIncorrect',
  type: 'object',
  properties: {
    status: { const: 401 },
    name: { const: 'EmailOrPasswordIncorrect' },
    message: { type: 'string' },
    details: { type: 'null' },
  },
  required: ['status', 'name', 'message', 'details'],
  additionalProperties: false,
} satisfies JSONSchema7

export const BadBasicToken = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/httpErrors/BadBasicToken',
  type: 'object',
  properties: {
    status: { const: 401 },
    name: { const: 'BadBasicToken' },
    message: { type: 'string' },
    details: { type: 'null' },
  },
  required: ['status', 'name', 'message', 'details'],
  additionalProperties: false,
} satisfies JSONSchema7

export const PasswordIncorrect = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/httpErrors/PasswordIncorrect',
  type: 'object',
  properties: {
    status: { const: 401 },
    name: { const: 'PasswordIncorrect' },
    message: { type: 'string' },
    details: { type: 'null' },
  },
  required: ['status', 'name', 'message', 'details'],
  additionalProperties: false,
} satisfies JSONSchema7

export const UserAlreadyExist = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/httpErrors/UserAlreadyExist',
  type: 'object',
  properties: {
    status: { const: 409 },
    name: { const: 'UserAlreadyExist' },
    message: { type: 'string' },
    details: {
      type: 'object',
      properties: {
        errors: {
          type: 'object',
          properties: {
            email: { type: 'string' },
          },
          required: ['email'],
          additionalProperties: false,
        },
      },
    },
  },
  required: ['status', 'name', 'message', 'details'],
  additionalProperties: false,
} satisfies JSONSchema7

export const EmailIsUsed = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/httpErrors/EmailIsUsed',
  type: 'object',
  properties: {
    status: { const: 400 },
    name: { const: 'EmailIsUsed' },
    message: { type: 'string' },
    details: { type: 'null' },
  },
  required: ['status', 'name', 'message', 'details'],
  additionalProperties: false,
} satisfies JSONSchema7

export const ResourceWasNotFound = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/httpErrors/ResourceWasNotFound',
  type: 'object',
  properties: {
    status: { const: 404 },
    name: { const: 'ResourceWasNotFound' },
    message: { type: 'string' },
    details: { type: 'null' },
  },
  required: ['status', 'name', 'message', 'details'],
  additionalProperties: false,
} satisfies JSONSchema7

export const UnknownServerError = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/httpErrors/UnknownServerError',
  type: 'object',
  properties: {
    status: { const: 500 },
    name: { type: 'string' },
    message: { type: 'string' },
    details: { type: 'null' },
  },
  required: ['status', 'name', 'message', 'details'],
  additionalProperties: false,
} satisfies JSONSchema7

export const ValidationError = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/httpErrors/ValidationError',
  type: 'object',
  properties: {
    status: { const: 400 },
    name: { const: 'ValidationError' },
    message: { type: 'string' },
    details: {
      type: 'object',
      properties: {
        errors: {
          type: 'object',
          additionalProperties: { type: 'string' },
        },
      },
    },
  },
  required: ['status', 'name', 'message', 'details'],
  additionalProperties: false,
} satisfies JSONSchema7

export const FailedToDelete = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/httpErrors/FailedToDelete',
  type: 'object',
  properties: {
    status: { const: 500 },
    name: { const: 'FailedToDelete' },
    message: { type: 'string' },
    details: { type: 'null' },
  },
  required: ['status', 'name', 'message', 'details'],
  additionalProperties: false,
} satisfies JSONSchema7

export const UnAuthorized = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/httpErrors/UnAuthorized',
  type: 'object',
  properties: {
    status: { const: 401 },
    name: { const: 'UnAuthorized' },
    message: { type: 'string' },
    details: { type: 'null' },
  },
  required: ['status', 'name', 'message', 'details'],
  additionalProperties: false,
} satisfies JSONSchema7

export const TokenFailed = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/httpErrors/TokenFailed',
  type: 'object',
  properties: {
    status: { const: 401 },
    name: { const: 'TokenFailed' },
    message: { type: 'string' },
    details: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: [
            'JsonWebTokenError',
            'TokenExpiredError',
            'NoTokenWasProvided',
            'UnspecifiedError',
          ],
        },
        date: { type: 'string' },
      },
      required: ['type'],
      additionalProperties: false,
    },
  },
  required: ['status', 'name', 'message', 'details'],
  additionalProperties: false,
} satisfies JSONSchema7

export const DefaultError = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/httpErrors/DefaultError',
  type: 'object',

  properties: {
    status: { const: 500 },
    name: { const: 'UnspecifiedError' },
    message: { type: 'string' },
    details: { type: 'null' },
  },

  required: ['status', 'name', 'message', 'details'],
  additionalProperties: false,
} satisfies JSONSchema7

import { JSONSchema7 } from 'json-schema'

// I can use $refs to clean up the schema,
// and when I'm done with openapi
// I can use extra builders to distinguish
// between input and output schemas
const Document = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    __v: { type: 'number' },
  },
  required: ['_id', '__v'],
  additionalProperties: false,
}

const Timestamps = {
  type: 'object',
  properties: {
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
  },
  required: ['createdAt', 'updatedAt'],
  additionalProperties: false,
}

export const Category_out = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: '/schema/category_out',
  allOf: [
    Document,
    {
      type: 'object',
      properties: {
        createdBy: { type: 'string' },
        title: { type: 'string' },
        color: { type: 'string' },
        icon: { type: 'string' },
      },
      required: ['createdBy', 'title'],
      additionalProperties: false,
    },
  ],
} as JSONSchema7

export const Category_in = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: '/schema/category_in',
  type: 'object',
  properties: {
    title: { type: 'string' },
    color: { type: 'string' },
    icon: { type: 'string' },
  },
  required: ['title'],
  additionalProperties: false,
} as JSONSchema7

export const Log_out = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: '/schema/log_out',
  allOf: [
    Document,
    Timestamps,
    {
      type: 'object',
      properties: {
        createdBy: { type: 'string' },
        title: { type: 'string' },
        amount: { type: 'number' },

        category: { ...Category_out, $id: '' }, // todo ability to refer to other by json pointer
        note: { type: 'string' },
      },
      required: ['createdBy', 'title', 'amount'],
      additionalProperties: false,
    },
  ],
} as JSONSchema7

export const Log_in = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: '/schema/log_in',
  type: 'object',
  properties: {
    title: { type: 'string' },
    amount: { type: 'number' },
    category: { type: 'string' },
    note: { type: 'string' },
  },
  required: ['title', 'amount'],
  additionalProperties: false,
} as JSONSchema7

export const Profile = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: '/schema/profile',
  allOf: [
    Document,
    Timestamps,
    {
      type: 'object',
      properties: {
        displayName: { type: 'string' },
        email: { type: 'string' },
        providers: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['local', 'google'],
          },
        },
        picture: { type: 'string' },
        token: { type: 'string' },
      },
      required: ['displayName', 'email', 'providers', 'token'],
      additionalProperties: false,
    },
  ],
} as JSONSchema7

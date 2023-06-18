import { JSONSchema7 } from 'json-schema'

export const Category_out = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/schema/category_out',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    __v: { type: 'number' },
    createdAt: { type: 'string' },
    title: { type: 'string' },
    color: { type: 'string' },
    icon: { type: 'string' },
  },
  required: ['_id', '__v', 'createdAt', 'title'],
  additionalProperties: false,
} as JSONSchema7

export const Category_in = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/schema/category_in',
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
  $id: 'https://example.com/schema/log_out',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    __v: { type: 'number' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    createdBy: { type: 'string' },
    title: { type: 'string' },
    amount: { type: 'number' },
    category: { ...Category_out, $id: '' }, // todo ability to refer to other by json pointer
    note: { type: 'string' },
  },
  required: [
    '_id',
    '__v',
    'createdAt',
    'updatedAt',
    'createdBy',
    'title',
    'amount',
  ],
  additionalProperties: false,
} as JSONSchema7

export const Log_in = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'https://example.com/schema/log_in',
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
  $id: 'https://example.com/schema/profile',
  type: 'object',
  properties: {
    _id: { type: 'string' },
    __v: { type: 'number' },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
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
  required: [
    '_id',
    '__v',
    'createdAt',
    'updatedAt',
    'displayName',
    'email',
    'providers',
    'token',
  ],
  additionalProperties: false,
} as JSONSchema7

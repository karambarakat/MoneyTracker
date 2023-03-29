/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'

export default {
  $schema: 'https://json-schema.org/draft/2020-09/schema',
  $id: 'http://ex.ample/modules/category',
  allOf: [
    { $ref: '/modules/helpers#/definitions/document' },
    {
      $id: '#base',
      type: 'object',
      required: ['title', 'createdBy'],
      additionalProperties: false,
      properties: {
        title: { type: 'string' },
        color: { type: 'string' },
        icon: { type: 'string' },
        createdBy: {
          ['x-relation']: {
            $ref: '/modules/profile',
            key: { type: 'string', readOnly: true },
            default: 'keepAsKey',
          },
        },
      },
      examples: [
        {
          title: 'Entertainment',
          color: '#333',
          icon: 'Fun_Face_Icon',
          createdBy: '63da2a0a643dd3aa49f5c6b1',
        },
      ],
    },
  ],
} satisfies JSONSchema7 as { $id: string }

export const category_simple = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://ex.ample/modules/category#simple',
  type: 'object',
  required: ['_id', 'title'],
  additionalProperties: false,
  properties: {
    _id: { type: 'string' },
    title: { type: 'string' },
    color: { type: 'string' },
    icon: { type: 'string' },
  },
  examples: [
    {
      _id: '63da2a0a643dd3aa49f5c6b1',
      title: 'Entertainment',
      color: '#333',
      icon: 'Fun_Face_Icon',
    },
  ],
} satisfies JSONSchema7 as { $id: string }

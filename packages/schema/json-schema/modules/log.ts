/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'

export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://ex.ample/modules/log',
  allOf: [
    { $ref: '/modules/helpers#/definitions/document' },
    { $ref: '/modules/helpers#/definitions/timeStamped' },
    {
      $id: '#base',
      type: 'object',
      required: ['title', 'amount', 'createdBy'],
      additionalProperties: false,
      properties: {
        title: { type: 'string' },
        amount: { type: 'number' },
        createdBy: {
          ['x-relation']: {
            $ref: '/modules/profile',
            key: { type: 'string', readOnly: true },
            default: 'keepAsKey',
          },
        },
        note: { type: 'string' },
        category: {
          ['x-relation']: {
            $ref: '/modules/category',
            key: { type: 'string' },
            default: 'dereference',
            patch: [
              {
                type: 'pick',
                ignore: ['createdBy', '__v', 'createdAt', 'updatedAt'],
              },
            ],
          },
        },
      },
      examples: [
        {
          title: 'buy new TV',
          amount: 400,
          createdBy: '63da2a0a643dd3aa49f5c6b1',
          note: 'new 40" plasma tv from flea market',
        },
      ],
    },
  ],
} satisfies JSONSchema7 as { $id: string }

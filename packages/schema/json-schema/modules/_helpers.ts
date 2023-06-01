/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'

export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://ex.ample/modules/helpers' as const,
  definitions: {
    document: {
      type: 'object',
      additionalProperties: false,
      required: ['_id', '__v'],
      properties: {
        _id: {
          type: 'string',
          examples: ['626819066b8ac48b612dda69'],
          readOnly: true,
        },
        __v: {
          oneOf: [
            { type: 'number', description: 'from backend sources' },
            {
              type: 'string',
              enum: ['offline'],
              description: 'frontend offline implementation',
            },
          ],
          examples: [0, 'offline'],
          default: 0,
          readOnly: true,
        },
      },
    },
    timeStamped: {
      type: 'object',
      required: ['createdAt', 'updatedAt'],
      additionalProperties: false,
      properties: {
        createdAt: {
          type: 'string',
          examples: ['2022-04-26T16:08:38.276Z'],
          readOnly: true,
        },
        updatedAt: {
          type: 'string',
          examples: ['2022-04-26T16:08:38.276Z'],
          readOnly: true,
        },
      },
    },
  },
} satisfies JSONSchema7

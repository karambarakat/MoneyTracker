/// <reference path="../../index.d.ts" />
// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/modules/helpers',
  definitions: {
    document: {
      type: 'object',
      readOnly: true,
      additionalProperties: false,
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
      readOnly: true,
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
}

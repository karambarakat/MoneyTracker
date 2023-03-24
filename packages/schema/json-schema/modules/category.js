/// <reference path="../../index.d.ts" />
// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/modules/category',
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
        createdBy: { type: 'string', readOnly: true },
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
}

/**
 * @type {import("json-schema").JSONSchema7}
 */
export const category_simple = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/modules/category#simple',
  type: 'object',
  required: ['_id', 'title', 'createdBy'],
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
}

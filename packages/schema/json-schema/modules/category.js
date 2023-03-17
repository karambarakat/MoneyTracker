// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/modules/category',
  allOf: [
    { $ref: '/modules/helpers#definitions/document' },
    {
      type: 'object',
      required: ['title', 'createdBy'],
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

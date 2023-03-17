// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/modules/categorySimple',
  type: 'object',
  required: ['_id', 'title', 'createdBy'],
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

// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/modules/providers',
  type: 'array',
  items: {
    type: 'string',
    enum: ['local', 'google'],
  },
  examples: [['local', 'google'], ['google'], ['local']],
}

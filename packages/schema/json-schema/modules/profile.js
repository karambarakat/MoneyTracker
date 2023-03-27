/// <reference path="../../index.d.ts" />
// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://ex.ample/modules/profile',
  allOf: [
    { $ref: '/modules/helpers#/definitions/document' },
    { $ref: '/modules/helpers#/definitions/timeStamped' },
    {
      $id: '#base',
      type: 'object',
      required: ['displayName', 'email', 'providers', 'token'],
      additionalProperties: false,
      properties: {
        displayName: { type: 'string' },
        email: { type: 'string', readOnly: true, format: 'email' },
        token: { type: 'string', readOnly: true },
        providers: { $ref: '/modules/providers', readOnly: true },
        picture: { type: 'string' },
      },
      examples: [
        {
          displayName: 'joe Due',
          email: 'JoeDue@gmail.com',
          token: 'eyJxxxx.xxxxx.xxxxxx',
          providers: ['local', 'google'],
          picture: 'https ://example.com/path/to/img',
        },
      ],
    },
  ],
}

/**
 * @type {import("json-schema").JSONSchema7}
 */
export const profile_providers = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://ex.ample/modules/profile#providers',
  type: 'array',
  items: {
    type: 'string',
    enum: ['local', 'google'],
  },
  examples: [['local', 'google'], ['google'], ['local']],
}

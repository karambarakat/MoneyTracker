// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/modules/profile',
  allOf: [
    { $ref: '/modules/helpers#definitions/document' },
    { $ref: '/modules/helpers#definitions/timeStamped' },
    {
      type: 'object',
      required: ['displayName', 'email', 'providers', 'token'],
      properties: {
        displayName: { type: 'string' },
        email: { type: 'string' },
        token: { type: 'string', readOnly: true },
        providers: { $ref: '/modules/providers' },
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

/// <reference path="../../index.d.ts" />
// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://ex.ample/requests/local-auth',
  definitions: {
    authenticate: {
      type: 'object',
      description: 'used in login or register as in basic token',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
      examples: [
        {
          email: 'something@gmail.com',
          password: 'somePassword',
        },
      ],
    },
    register: {
      type: 'object',
      description: 'make new account with a displayName',
      properties: {
        displayName: { type: 'string' },
        picture: { type: 'string' },
      },
      examples: [
        {
          displayName: 'joe Due',
          picture: 'https ://example.com/path/to/img',
        },
      ],
    },
  },
}

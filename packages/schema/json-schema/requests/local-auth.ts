/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'

export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
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
} satisfies JSONSchema7 as { $id: string }

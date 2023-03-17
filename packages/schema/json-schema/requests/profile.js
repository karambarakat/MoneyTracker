// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/requests/profile',
  definitions: {
    email_status: {
      type: 'object',
      required: ['email'],
      description: `
        when provided with email, this 
        will resolve to all available 
        authentication methods for given email
      `,
      properties: {
        email: {
          type: 'string',
          examples: ['joeDue@gmail.com'],
        },
      },
    },
    profile_update: {
      type: 'object',
      description: 'update profile information',
      properties: {
        displayName: {
          type: 'string',
          examples: ['Joe Doe'],
        },
        picture: {
          type: 'string',
          examples: ['https ://example.com/path/to/img'],
        },
      },
    },
    updatePassword: {
      type: 'object',
      description: 'reset the password',
      required: ['newPassword'],
      properties: {
        oldPassword: {
          description: 'may be required if `local` authenticate is provided',
          type: 'string',
          examples: [12345567],
        },
        newPassword: {
          type: 'string',
          examples: ['12345567differentPassword'],
        },
      },
    },
    updatePassword_nolocal: {
      type: 'object',
      description: 'set a password',
      required: ['newPassword'],
      properties: {
        newPassword: {
          type: 'string',
          examples: ['12345567differentPassword'],
        },
      },
    },
  },
}

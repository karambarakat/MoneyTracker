/// <reference path="../../index.d.ts" />
// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://ex.ample/requests/profile',
  definitions: {
    email_status: {
      $id: '#email_status',
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
          format: 'email',
          examples: ['joeDue@gmail.com'],
        },
      },
    },
    profile_update: {
      $id: '#profile_update',
      description: 'update profile information',
      $ref: '/modules/profile#base',
      'x-remove_read_only': true,
      'x-partial': true,
    },
    updatePassword: {
      $id: '#updatePassword',
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
      $id: '#updatePassword_nolocal',
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

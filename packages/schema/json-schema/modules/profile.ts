/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'

export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://ex.ample/modules/profile' as const,
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
        providers: { $ref: '#providers', readOnly: true },
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
  definitions: {
    providers: {
      $id: '#providers',
      type: 'array',
      items: {
        type: 'string',
        enum: ['local', 'google'],
      },
      examples: [['local', 'google'], ['google'], ['local']],
    },
  },
} satisfies JSONSchema7

/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'

export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://ex.ample/requests/log' as const,
  definitions: {
    create: {
      description: 'create new log',
      $id: '#create',
      $ref: '/modules/log#base',
    },
    update: {
      description: 'update the given log',
      $id: '#update',
      $ref: '/modules/log#base',
    },
  },
} satisfies JSONSchema7

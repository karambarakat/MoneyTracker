/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'

export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://ex.ample/requests/category',
  definitions: {
    create: {
      $id: '#create',
      description: 'create new category',
      $ref: '/modules/category#base',
    },
    update: {
      $id: '#update',
      description: 'update the given category',
      $ref: '/modules/category#base',
    },
  },
} satisfies JSONSchema7 as { $id: string }

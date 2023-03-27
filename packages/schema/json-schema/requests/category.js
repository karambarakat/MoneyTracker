/// <reference path="../../index.d.ts" />
// @ts-check
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://ex.ample/requests/category',
  definitions: {
    create: {
      description: 'create new category',
      $ref: '/modules/category#base',
      'x-remove_read_only': true,
    },
    update: {
      description: 'update the given category',
      $ref: '/modules/category#base',
      'x-remove_read_only': true,
      'x-partial': true,
    },
  },
}

/// <reference path="../../index.d.ts" />
// @ts-check
/**
 * @type {import("json-schema").JSONSchema7Definition}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://ex.ample/requests/log',
  definitions: {
    create: {
      description: 'create new log',
      $id: '#create',
      $ref: '/modules/log#base',
      'x-remove_read_only': true,
    },
    update: {
      description: 'update the given log',
      $id: '#update',
      $ref: '/modules/log#base',
      'x-remove_read_only': true,
      'x-partial': true,
    },
  },
}

/// <reference path="../../index.d.ts" />
// @ts-check
import prune from '../../utils/prune.js'
import log from '../modules/log.js'
/**
 * @type {import("json-schema").JSONSchema7Definition}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/requests/log',
  definitions: {
    create: {
      $id: '#create',
      description: 'create new log',
      $ref: '/modules/log#base',
      // 'x-remove_read_only': true,
    },
    update: {
      description: 'update the given log',
      $id: '#update',
      // $patch: {
      //   source: { $ref: '/modules/log#base' },
      //   with: [
      //     {
      //       op: 'remove',
      //       path: '/required',
      //     },
      //   ],
      // },
      // 'x-remove_read_only': true,
      $ref: '/modules/log#base',
      type: 'object',
      properties: {
        hi: {
          'x-partial': true,
        },
      },
      // 'x-partial': true,
    },
  },
}

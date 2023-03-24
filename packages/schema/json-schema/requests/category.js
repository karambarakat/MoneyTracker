/// <reference path="../../index.d.ts" />
// @ts-check
import category from '../modules/category.js'
import prune from '../../utils/prune.js'
/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/requests/category',
  definitions: {
    create: {
      description: 'create new category',
      // $patch: {},
      // 'x-remove_read_only': true,
      $patch: {
        source: { $ref: '/modules/log#base' },
        with: [
          {
            op: 'remove',
            path: '/required',
          },
        ],
      },
    },
    update: {
      description: 'update the given category',
      // 'x-remove_read_only': true,
      $patch: {
        source: { $ref: '/modules/log#base' },
        with: [
          {
            op: 'remove',
            path: '/required',
          },
        ],
      },
    },
  },
}

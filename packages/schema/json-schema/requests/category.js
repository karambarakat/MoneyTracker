// @ts-check
import ajv from 'ajv'
import category from '../modules/category.js'
import { partial, removeReadOnly } from '../../utils/manipulateSchema.js'

/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/requests/category',
  definitions: {
    create: {
      description: 'create new category',
      ...removeReadOnly(category),
    },
    update: {
      description: 'update the given category',
      ...partial(removeReadOnly(category)),
    },
  },
}

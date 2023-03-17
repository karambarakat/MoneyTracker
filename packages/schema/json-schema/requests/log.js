// @ts-check
import log from '../modules/log.js'
import { partial, removeReadOnly } from '../../utils/manipulateSchema.js'

/**
 * @type {import("json-schema").JSONSchema7}
 */
export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'http://mypocket-schema.kenn.page/requests/log',
  definitions: {
    create: {
      description: 'create new log',
      ...removeReadOnly(log),
    },
    update: {
      description: 'update the given log',
      ...partial(removeReadOnly(log)),
    },
  },
}

//@ts-check
import log from '../../json-schema/modules/log.js'

import _, { $ } from '../../src/wrappers/openapi/index.js'

export const get = _(
  $.meta({
    tag: 'log',
    description: 'list all logs for the current user',
    summary: 'list all log',
  }),
  $.bearerToken(),
  $.fetch({ data: log })
)

export const post = _(
  $.meta({
    tag: 'log',
    description: 'create a new log for the current user',
    summary: 'create a new log',
  }),
  $.body({
    description: 'properties like title, amount, category and note',
    content: { $ref: 'http://ex.ample/modules/log#base' },
    partial: false,
    removeReadOnly: true,
  }),
  $.bearerToken(),
  $.create({ data: log })
)

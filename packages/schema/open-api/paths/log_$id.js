//@ts-check
import category from '../../json-schema/modules/category.js'
import log from '../../json-schema/modules/log.js'

import _, { $ } from '../../src/wrappers/openapi/index.js'

export const get = _(
  $.meta({
    tag: 'log',
    description: 'fetch log by its id for the current user',
    summary: 'fetch log',
  }),
  $.bearerToken(),
  $.byId(),
  $.fetch({ data: log })
)

export const put = _(
  $.meta({
    tag: 'log',
    description: 'update log by id for the current user',
    summary: 'update log',
  }),
  $.bearerToken(),
  $.byId(),
  $.body({
    description: 'properties like title, amount, category and note',
    content: { $ref: 'http://ex.ample/modules/log#base' },
    partial: true,
    removeReadOnly: true,
  }),
  $.fetch({ data: category })
)

export const delete_ = _(
  $.bearerToken(),
  $.byId(),
  $.meta({
    tag: 'log',
    description: 'delete log by id for the current user',
    summary: 'delete log',
  }),
  $.delete_()
)

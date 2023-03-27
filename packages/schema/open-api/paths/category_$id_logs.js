//@ts-check
import log from '../../json-schema/modules/log.js'
import _, { $ } from '../../src/wrappers/openapi/index.js'

export const get = _(
  $.meta({
    tag: 'log',
    description: 'fetch logs for a category id for the current user',
    summary: 'fetch logs for a category',
  }),
  $.bearerToken(),
  $.byId(),
  $.fetch({ data: log, paged: true })
)

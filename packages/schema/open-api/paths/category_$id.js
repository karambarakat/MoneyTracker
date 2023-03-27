//@ts-check
import category from '../../json-schema/modules/category.js'

import _, { $ } from '../../src/wrappers/openapi/index.js'

export const get = _(
  $.meta({
    tag: 'category',
    description: 'fetch category by id for the current user',
    summary: 'fetch category',
  }),
  $.bearerToken(),
  $.byId(),
  $.fetch({ data: category })
)

export const put = _(
  $.meta({
    tag: 'category',
    description: 'update category by id for the current user',
    summary: 'update category',
  }),
  $.bearerToken(),
  $.byId(),
  $.body({
    description: 'properties like title, color and icon',
    content: { $ref: 'http://ex.ample/modules/category#base' },
    partial: true,
    removeReadOnly: true,
  }),
  $.fetch({ data: category })
)

export const delete_ = _(
  $.bearerToken(),
  $.byId(),
  $.meta({
    tag: 'category',
    description: 'delete category by id for the current user',
    summary: 'delete category',
  }),
  $.delete_()
)

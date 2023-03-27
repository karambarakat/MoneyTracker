//@ts-check
import category from '../../json-schema/modules/category.js'

import _, { $ } from '../../src/wrappers/openapi/index.js'

export const get = _(
  $.meta({
    tag: 'category',
    description: 'list all categories for the current user',
    summary: 'list all categories',
  }),
  $.bearerToken(),
  $.fetch({ data: category })
)

export const post = _(
  $.meta({
    tag: 'category',
    description: 'create a new category for the current user',
    summary: 'create a new category',
  }),
  $.body({
    description: 'properties like title, color and icon',
    content: { $ref: 'http://ex.ample/modules/category#base' },
    partial: false,
    removeReadOnly: true,
  }),
  $.bearerToken(),
  $.create({ data: category })
)

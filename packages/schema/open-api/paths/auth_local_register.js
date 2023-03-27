// @ts-check
import _, { $ } from '../../src/wrappers/openapi/index.js'
import profile from '../../json-schema/modules/profile.js'

export const post = _(
  $.meta({
    tag: 'auth',
    description:
      'register using email and password using Basic token http header',
    summary: 'register using email and password',
  }),
  $.basicToken(),
  $.create({ data: profile }),
  $.body({
    description: 'displayname and picture',
    content: { $ref: 'http://ex.ample/modules/profile#base' },
    partial: true,
    removeReadOnly: true,
  }),
  $.error({ Key: 'e409UserAlreadyExist' })
)

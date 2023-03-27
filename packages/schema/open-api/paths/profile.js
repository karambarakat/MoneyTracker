// @ts-check
import _, { $ } from '../../src/wrappers/openapi/index.js'
import profile from '../../json-schema/modules/profile.js'

export const get = _(
  $.meta({
    tag: 'profile',
    description: 'retrieve profile info',
    summary: 'get profile',
  }),
  $.bearerToken(),
  $.fetch({ data: profile })
)

export const put = _(
  $.meta({
    tag: 'profile',
    description: 'update profile information',
    summary: 'update profile',
  }),
  $.bearerToken(),
  $.body({
    description: 'fields to update',
    content: { $ref: 'http://ex.ample/modules/profile#base' },
    partial: true,
    removeReadOnly: true,
  }),
  $.fetch({ data: profile })
)

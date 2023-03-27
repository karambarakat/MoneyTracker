// @ts-check
import _, { $ } from '../../src/wrappers/openapi/index.js'
import profile from '../../json-schema/modules/profile.js'

export const post = _(
  $.meta({
    tag: 'auth',
    description: 'login using email and password using Basic token http header',
    summary: 'login using email and password',
  }),
  $.basicToken(),
  $.error({ Key: 'e401EmailOrPasswordIncorrect' }),
  $.fetch({ data: profile })
)

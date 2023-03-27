// @ts-check
import _, { $ } from '../../src/wrappers/openapi/index.js'
import profile from '../../json-schema/modules/profile.js'

export const put = _(
  $.meta({
    tag: 'profile',
    description: '(re)set password',
    summary: '(re)set password',
  }),
  $.bearerToken(),
  $.body({
    description: 'update the password',
    content: {
      type: 'object',
      required: ['newPassword'],
      properties: {
        oldPassword: {
          description: 'may be required if `local` authenticate is provided',
          type: 'string',
          // @ts-ignore in openapi 3.0.0, examples is not allowed in properties
          example: '12345567',
        },
        newPassword: {
          type: 'string',
          // @ts-ignore in openapi 3.0.0, examples is not allowed in properties
          example: '12345567differentPassword',
        },
      },
    },
  }),
  $.fetch({ data: profile })
)

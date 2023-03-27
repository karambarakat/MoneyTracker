// @ts-check
import _, { $ } from '../../src/wrappers/openapi/index.js'
import profile from '../../json-schema/modules/profile.js'

export const get = _(
  $.meta({
    tag: 'profile',
    description:
      'when provided with email, this will resolve to all available authentication methods for given email',
    summary: 'authentication status',
  }),
  $.body({
    required: true,
    description: 'email',
    content: {
      type: 'object',
      required: ['email'],
      properties: {
        email: {
          type: 'string',
          // @ts-ignore in openapi 3.0.0, examples is not allowed in properties
          example: ['joeDue@gmail.com'],
        },
      },
    },
  }),

  $.fetch({
    data: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['local', 'google'],
      },
    },
  })
)

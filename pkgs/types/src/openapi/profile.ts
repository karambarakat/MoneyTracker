import oapi_operation from '../builders/OapiOperation'

export const status = oapi_operation(
  ['/profile/status', 'get'],
  [
    {
      step: 'info',
      summary: 'authentication status',
      description:
        'when provided with email, this will resolve to all available authentication methods for given email',
      tags: ['profile'],
    },
    {
      step: 'request_body',
      data: {
        type: 'object',
        required: ['email'],
        properties: {
          email: {
            type: 'string',
            examples: ['k@gmail.com'],
          },
        },
      },
    },
    {
      step: 'data',
      data: {
        type: 'object',
        properties: {
          providers: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['local', 'google'],
            },
          },
        },
      },
    },
  ],
)

export const profile_get = oapi_operation(
  ['/profile', 'get'],
  [
    {
      step: 'info',
      summary: 'get profile',
      description: 'retrieve profile info',
      tags: ['profile'],
    },
    {
      step: 'protected',
    },
    {
      step: 'data',
      data: {
        $ref: '/schema/profile',
      },
    },
  ],
)

export const profile_put = oapi_operation(
  ['/profile', 'put'],
  [
    {
      step: 'info',
      summary: 'update profile',
      description: 'update profile information',
      tags: ['profile'],
    },
    {
      step: 'protected',
    },
    {
      step: 'request_body',
      data: {
        type: 'object',
        properties: {
          displayName: {
            type: 'string',
            examples: ['Joe Doe'],
          },
          picture: {
            type: 'string',
            examples: ['https://example.com/path/to/img'],
          },
        },
      },
    },
    {
      step: 'data',
      data: {
        $ref: '/schema/profile',
      },
    },
  ],
)

export const profile_set_password = oapi_operation(
  ['/profile/password', 'put'],
  [
    {
      step: 'info',
      summary: '(re)set password',
      description: 'update users password',
      tags: ['profile'],
    },
    {
      step: 'protected',
    },
    {
      step: 'request_body',
      data: {
        type: 'object',
        required: ['newPassword'],
        properties: {
          oldPassword: {
            description: 'may be required if `local` authenticate is provided',
            type: 'string',
          },
          newPassword: {
            type: 'string',
          },
        },
      },
    },
    {
      step: 'data',
      data: {
        $ref: '/schema/profile',
      },
    },
  ],
)

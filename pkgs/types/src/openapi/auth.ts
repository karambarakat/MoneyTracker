import oapi_operation from '../builders/OapiOperationBuilder'

export const local_login = oapi_operation(
  ['/auth/local/login/', 'post'],

  [
    { step: 'protected_email_password' },
    {
      step: 'info',
      summary: 'login',
      description:
        'login using email and password using Basic Token Http Authorization',
      tags: ['local_authorization'],
    },
    {
      step: 'data',
      data: {
        $ref: '/schema/profile',
      },
    },
  ],
)

export const local_register = oapi_operation(
  ['/auth/local/register/', 'post'],
  [
    { step: 'protected_email_password' },
    {
      step: 'info',
      summary: 'register',
      description: 'make new account using email and password',
      tags: ['local_authorization'],
    },
    {
      step: 'response',
      status: 201,
      data: {
        $ref: '/schema/profile',
      },
    },
    {
      step: 'request_body',
      data: {
        type: 'object',
        properties: {
          displayName: {
            type: 'string',
            description: 'display name',
            examples: ['John Doe'],
          },
        },
      },
    },
    {
      step: 'error',
      status: 409,
      description: 'user already exist',
      data: {
        $ref: '/httpErrors/UserAlreadyExist',
      },
    },
  ],
)

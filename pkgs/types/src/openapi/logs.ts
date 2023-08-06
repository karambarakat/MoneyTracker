import oapi_operation from '../builders/OapiOperationBuilder'

export const log = oapi_operation(
  ['/log/', 'get'],
  [
    {
      step: 'info',
      summary: 'list all logs',
      description: 'list all logs for the current user',
      tags: ['log'],
    },
    {
      step: 'protected',
    },
    {
      step: 'data',
      data: {
        type: 'array',
        items: {
          $ref: '/schema/log_out',
        },
      },
    },
  ],
)

export const log_post = oapi_operation(
  ['/log/', 'post'],
  [
    {
      step: 'info',
      summary: 'create new log',
      description: 'create new log for the current user',
      tags: ['log'],
    },
    {
      step: 'protected',
    },
    {
      step: 'request_body',
      data: {
        $ref: '/schema/log_in',
      },
    },
    {
      step: 'data',
      data: {
        $ref: '/schema/log_out',
      },
    },
  ],
)

export const log_byId = oapi_operation(
  ['/log/{id}/', 'get'],
  [
    {
      step: 'info',
      summary: 'get log',
      description: 'create new log for the current user',
      tags: ['log'],
    },
    {
      step: 'protected',
    },
    {
      step: 'byId',
    },
    {
      step: 'data',
      data: {
        $ref: '/schema/log_out',
      },
    },
  ],
)

export const log_byId_put = oapi_operation(
  ['/log/{id}/', 'put'],
  [
    {
      step: 'info',
      summary: 'update log',
      description: 'update log by id',
      tags: ['log'],
    },
    {
      step: 'protected',
    },
    {
      step: 'byId',
    },
    {
      step: 'request_body',
      data: {
        $ref: '/schema/log_in_update',
      },
    },
    {
      step: 'data',
      data: {
        $ref: '/schema/log_out',
      },
    },
  ],
)

export const log_byId_delete = oapi_operation(
  ['/log/{id}/', 'delete'],
  [
    {
      step: 'info',
      summary: 'delete log',
      description: 'delete log by id',
      tags: ['log'],
    },
    {
      step: 'protected',
    },
    {
      step: 'byId',
    },
    {
      step: 'data',
      data: {
        type: 'object',
      },
    },
  ],
)

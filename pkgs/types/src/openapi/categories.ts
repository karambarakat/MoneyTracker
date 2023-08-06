import oapi_operation from '../builders/OapiOperationBuilder'

export const category = oapi_operation(
  ['/category/', 'get'],
  [
    {
      step: 'info',
      summary: 'list all categories',
      description: 'list all categories for the current user',
      tags: ['category'],
    },
    {
      step: 'protected',
    },
    {
      step: 'data',
      data: {
        type: 'array',
        items: {
          $ref: '/schema/category_out',
        },
      },
    },
  ],
)

export const category_post = oapi_operation(
  ['/category/', 'post'],
  [
    {
      step: 'info',
      summary: 'create new category',
      description: 'create new category for the current user',
      tags: ['category'],
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
        $ref: '/schema/category_out',
      },
    },
  ],
)

export const category_byId = oapi_operation(
  ['/category/{id}/', 'get'],
  [
    {
      step: 'info',
      description: 'get category by id',
      tags: ['category'],
      summary: 'get category',
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
        $ref: '/schema/category_out',
      },
    },
  ],
)

export const category_byId_put = oapi_operation(
  ['/category/{id}/', 'put'],
  [
    {
      step: 'info',
      description: 'update category by id',
      tags: ['category'],
      summary: 'update category',
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
        $ref: '/schema/category_in_update',
      },
    },
    {
      step: 'data',
      data: {
        $ref: '/schema/category_out',
      },
    },
  ],
)

export const category_byId_delete = oapi_operation(
  ['/category/{id}/', 'delete'],
  [
    {
      step: 'info',
      description: 'delete category by id',
      tags: ['category'],
      summary: 'delete category',
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

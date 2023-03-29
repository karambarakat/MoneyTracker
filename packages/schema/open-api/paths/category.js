//@ts-check
/**
 * @param {import('../../src/wrappers/openapi/index.js').default} _
 *
 */
export default (_) => {
  _.addPath('/category/', 'get', [
    {
      type: 'meta',
      tag: 'category',
      summary: 'list all categories',
      description: 'list all categories for the current user',
    },
    { type: 'security', subType: 'bearer' },
    { type: 'read', schema: '/modules/category', paged: true },
  ])

  _.addPath('/category/', 'post', [
    {
      type: 'meta',
      tag: 'category',
      summary: 'create new category',
      description: 'create new category for the current user',
    },
    { type: 'security', subType: 'bearer' },
    { type: 'request', schema: '/requests/category#create', required: true },
    { type: 'create', schema: '/modules/category' },
  ])

  _.addPath('/category/{id}/', 'get', [
    {
      type: 'meta',
      tag: 'category',
      summary: 'get category by id',
      description: 'get category by id for the current user',
    },
    { type: 'byId' },
    { type: 'security', subType: 'bearer' },
    { type: 'read', schema: '/modules/category' },
  ])

  _.addPath('/category/{id}/', 'put', [
    {
      type: 'meta',
      tag: 'category',
      summary: 'update category by id',
      description: 'update category by id for the current user',
    },
    { type: 'byId' },
    { type: 'security', subType: 'bearer' },
    { type: 'update', schema: '/requests/category#update' },
  ])

  _.addPath('/category/{id}', 'delete', [
    {
      type: 'meta',
      tag: 'category',
      summary: 'delete category by id',
      description: 'delete category by id for the current user',
    },
    { type: 'byId' },
    { type: 'security', subType: 'bearer' },
    { type: 'delete' },
  ])

  _.addPath('/category/{id}/logs', 'get', [
    {
      type: 'meta',
      tag: 'log',
      summary: 'get logs for category by id',
      description: 'get logs for category by id for the current user',
    },
    { type: 'meta', tag: 'category' },
    { type: 'byId' },
    { type: 'security', subType: 'bearer' },
    { type: 'read', schema: '/modules/logs', paged: true },
  ])
}

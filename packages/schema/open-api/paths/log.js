//@ts-check
/**
 * @param {import('../../src/wrappers/openapi/index.js').default} _
 *
 */
export default (_) => {
  _.addPath('/log/', 'get', [
    {
      type: 'meta',
      tag: 'log',
      summary: 'list all logs',
      description: 'list all logs for the current user',
    },
    { type: 'security', subType: 'bearer' },
    { type: 'read', schema: '/modules/log', paged: true },
  ])

  _.addPath('/log/', 'post', [
    {
      type: 'meta',
      tag: 'log',
      summary: 'create new log',
      description: 'create new log for the current user',
    },
    { type: 'security', subType: 'bearer' },
    { type: 'request', schema: '/modules/log', required: true },
    { type: 'create', schema: '/modules/log' },
  ])

  _.addPath('/log/{id}', 'get', [
    {
      type: 'meta',
      tag: 'log',
      summary: 'get log by id',
      description: 'get log by id for the current user',
    },
    { type: 'byId' },
    { type: 'security', subType: 'bearer' },
    { type: 'read', schema: '/modules/log' },
  ])

  _.addPath('/log/{id}', 'put', [
    {
      type: 'meta',
      tag: 'log',
      summary: 'update log by id',
      description: 'update log by id for the current user',
    },
    { type: 'byId' },
    { type: 'security', subType: 'bearer' },
    { type: 'update', schema: '/modules/log' },
  ])

  _.addPath('/log/{id}', 'delete', [
    {
      type: 'meta',
      tag: 'log',
      summary: 'delete log by id',
      description: 'delete log by id for the current user',
    },
    { type: 'byId' },
    { type: 'security', subType: 'bearer' },
    { type: 'delete' },
  ])
}

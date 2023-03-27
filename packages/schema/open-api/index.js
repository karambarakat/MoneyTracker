// @ts-check
import paths from './paths/index.js'
import { oapi_comp } from '../src/wrappers/openapi/openapi.js'

/**
 * @type {import('openapi-types').OpenAPIV3.Document}
 */
const oapi = {
  openapi: '3.0.0',
  info: {
    title: 'myPocket',
    version: '1.0.0',
    description: 'API',
  },
  servers: [
    {
      url: 'https://localhost:{port}/api/{version}',
      description: 'Development localhost server',
      variables: {
        port: {
          default: '3000',
        },
        version: {
          default: 'v1',
        },
      },
    },
  ],
  paths,
  components: oapi_comp,
}

export default oapi

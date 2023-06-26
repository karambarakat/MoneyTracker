import { JSONSchema7 } from 'json-schema'

// more universal syntax ??
/**
what about 
```js
const http = build_http_error(302, 'Redirect', {
  type: 'object',
  properties: {
    location: { type: 'string' },
  },
  required: ['location'],
  additionalProperties: false,
})

const openapi_operation = build_operation('/', 'get', [
  {
    step: 'info',
    summary: 'List API versions',
    description: 'List API versions',
    tags: ['api'],
  },
  {
    step: 'protected',
    security: [{ bearerAuth: [] }],
  },
  {
    step: 'request_body',
    data: {
      $ref: '/schema/logs',
      $transform: { ... },
  },
  {
    step: 'resource',
    data: {
      $ref: '/schema/logs',
    },
  },
])

// the code above will generate 
1. `paths./.get` with basic info
2. response of 401
3. parameter of bearerAuth
4. parameters in body of `/schema/logs`
5. response of 400 for invalid request body
6. response of 200 with schema of `/schema/logs`
```

 */
export default function HttpErrorBuilder(
  status: number,
  name: string,
  details?: JSONSchema7 & { type: 'object' },
) {
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: `/httpErrors/${name}` as const,
    type: 'object',
    properties: {
      status: { const: status },
      name: { const: name },
      message: { type: 'string' },
      details: details ?? { type: 'null' },
    },
    required: ['status', 'name', 'message', 'details'],
    additionalProperties: false,
  } satisfies JSONSchema7
}

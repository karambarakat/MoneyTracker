// @ts-check
/**
 * @function restErrorResponse
 * @param {import('json-schema').JSONSchema7} schema
 * @returns {import('openapi-types').OpenAPIV3.ResponseObject}
 */
export default function restErrorResponse(schema) {
  return {
    description: schema.description || 'Error',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              // @ts-ignore
              type: 'null',
            },
            // @ts-ignore
            error: schema,
          },
        },
      },
    },
  }
}

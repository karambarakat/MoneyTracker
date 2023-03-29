import { JSONSchema7 } from "json-schema";
import { OpenAPIV3 } from "openapi-types";

export default function restErrorResponse(schema: JSONSchema7) {

  return {
    description: schema.description || 'Error',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'null',
            },
            // @ts-ignore
            error: schema,
          },
        },
      },
    },
  } as unknown as OpenAPIV3.ResponseObject
}

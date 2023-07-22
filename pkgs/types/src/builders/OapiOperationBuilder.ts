import { OpenAPIV3 } from 'openapi-types'
import merge from 'lodash/merge'
import { JSONSchema7 } from 'json-schema'
import refs from '../../dist/helpers/refs'

type OAPI_RT = { path: (string | number)[]; obj: OpenAPIV3.OperationObject }
type operation_path = [string, `${OpenAPIV3.HttpMethods}`]

export default function oapi_operation(
  path: operation_path,
  build_steps: BuildSteps[],
): OAPI_RT {
  return {
    path: ['paths', ...path],
    obj: build_steps
      .map(build_step => {
        return transformers[build_step.step](build_step as any)
      })
      .reduce<OpenAPIV3.OperationObject>(
        (acc, cur) => {
          return merge(acc, cur)
        },
        { responses: {} },
      ),
  }
}

const transformers = {
  error: (step: { status: number; data: JSONSchema7; description: string }) => {
    return {
      responses: {
        [step.status]: {
          description: step.description,
          content: {
            'application/json': {
              schema: step.data as JSONSchema7 as any,
            },
          },
        },
      },
    }
  },
  response: (step: {
    status: number
    description?: string
    data: JSONSchema7
  }) => {
    return {
      responses: {
        [step.status]: {
          ...(step.description
            ? { description: step.description }
            : { description: '' }),
          content: {
            'application/json': {
              schema: {
                description: step.data.description || '',
                ...step.data,
              } as JSONSchema7 as any,
            },
          },
        },
      },
    }
  },

  info: (step: { summary?: string; description: string; tags?: string[] }) => {
    const rt = {}
    step.summary && Reflect.set(rt, 'summary', step.summary)
    step.description && Reflect.set(rt, 'description', step.description)
    step.tags && Reflect.set(rt, 'tags', step.tags)
    return rt
  },
  data: (step: { data: JSONSchema7 }) => {
    return {
      responses: {
        200: {
          description: '200 ok',
          content: {
            'application/json': {
              schema: {
                description: step.data.description || 'return data',
                ...step.data,
              } as JSONSchema7 as any,
            },
          },
        },
      },
    }
  },
  protected_email_password: (step: object) => {
    return {
      security: [{ basicAuth: [] }],
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          description: 'base64 email and password pair with colon as delimiter',
          required: true,
          schema: {
            type: 'string',
            example: 'Basic xxxxxxxxx=',
            format: 'password',
          },
        },
      ],
      responses: {
        401: {
          description: 'password or email doesn\'t match',
          $ref: '/httpErrors/PasswordIncorrect' satisfies refs,
        },
      },
    }
  },
  protected: (step: object) => {
    return {
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'Authorization',
          in: 'header',
          description: ' brearer token, obtained from /auth/*',
          required: true,
          schema: {
            type: 'string',
            format: 'bearer',
          },
        },
      ],
      responses: {
        401: {
          description: 'unauthorized',
          $ref: '/httpErrors/UnAuthorized' satisfies refs,
        },
      },
    }
  },
  request_body: (step: { data: JSONSchema7 }) => {
    const required = step.data.required
      ? ({
          responses: {
            400: {
              description: 'validation error',
              $ref: '/httpErrors/ValidationError' satisfies refs,
            },
          },
        } satisfies OpenAPIV3.OperationObject)
      : {}

    return {
      ...required,
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              description: step.data.description || 'request body',
              ...step.data,
            } as JSONSchema7 as any,
          },
        },
      },
    }
  },
  parameter: (step: { data: OpenAPIV3.ParameterObject }) => {
    return {
      parameters: [step.data],
    }
  },
  byId: (step: object) => {
    return {
      responses: {
        404: {
          description: 'resource was not found',
          $ref: '/httpErrors/ResourceWasNotFound' satisfies refs,
        },
      },
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'id of the resource',
          required: true,
          schema: {
            type: 'string',
            example: '63da2a0a643dd3aa49f5c6b1',
          },
        },
      ],
    }
  },
} satisfies Record<string, Transformer>

type Transformer = (arg: any) => Partial<OpenAPIV3.OperationObject>

type Transformers = typeof transformers

type StepsFromTransformers<T> = T extends Record<infer A, any>
  ? A extends A
    ? T[A] extends (arg: infer B) => any
      ? { step: A } & B
      : never
    : never
  : never

type BuildSteps = StepsFromTransformers<Transformers>

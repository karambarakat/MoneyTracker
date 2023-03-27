/// <reference path="./_.ts" />
// @ts-check

import * as errors from '../../../json-schema/import.js'
import restErrorResponse from '../restErrorResponse.js'
import { RawFunctionTransformer as _ } from './helpers.js'

/**
 * @type {import('./_.js').RawComponent<{tag: string, summary: string, description: string}>}}
 */
export const _meta = ({ data, actions }, meta) => {
  if (!data.tags) data.tags = []
  data.tags.push(meta.tag)
  data.summary = meta.summary
  data.description = meta.description
}

export const meta = _(_meta)

/**
 * @type {import('./_.js').RawComponent}}
 */
const _bearerToken = ({ data, actions }) => {
  if (!data.security) data.security = []

  actions.addComponent((_) => _.securitySchemes.BearerToken, {
    type: 'http',
    scheme: 'bearer',
    description: `
      this is the standard way to authenticate
      requests, such a token can be obtained via
      emailAuth or googleAuth
      \`\`\`
      curl 'http://exmaple:0000/api/path/to' \
        --H 'Authorization: Bearer eyxxx.xxx.xxx' \
      \`\`\`
    `,
  })
  data.security.push({ BearerToken: [] })

  if (!data.parameters) data.parameters = []

  actions.addComponent((_) => _.parameters.bearerAuth, {
    in: 'header',
    name: 'Authorization',
    description: 'can be obtained by `auth/*/*`, in form of eyxxx.xxx.xxx',
    schema: { type: 'string', example: 'Bearer eyxxx.xxx.xxx' },
    required: true,
  })

  data.parameters.push({
    $ref: '#/components/parameters/bearerAuth',
  })

  data.responses['401'] = restErrorResponse(errors.e401TokenFailed.default)
}

export const bearerToken = _(_bearerToken)

/**
 * @type {import('./_.js').RawComponent}}
 */
const _basicToken = ({ data, actions }) => {
  if (!data.security) data.security = []

  actions.addComponent((_) => _.securitySchemes.BasicToken, {
    type: 'http',
    scheme: 'basic',
    description: `
      use email and password to gain
      user's profile along with the
      token.
      \`\`\`
      curl 'http://exmaple:0000/api/path/to' \
        --H 'Authorization: Basic ZGtAZy5jOjEyMw==' \
      \`\`\`
    `,
  })
  data.security.push({ BasicToken: [] })

  if (!data.parameters) data.parameters = []

  actions.addComponent((_) => _.parameters.emailPassword, {
    in: 'header',
    name: 'Authorization',
    description: 'base64 email and password pair with colon as separator',
    schema: {
      type: 'string',
      example: 'Basic xxxxx',
    },
    required: true,
  })

  data.parameters.push({
    $ref: '#/components/parameters/emailPassword',
  })
}

export const basicToken = _(_basicToken)

/**
 * @type {import('./_.js').RawComponent<{Key: keyof import('../../../json-schema/import.js')}>}}
 */
const _error = ({ data, actions }, opt) => {
  if (!data.responses) data.responses = {}

  if (!opt.Key.startsWith('e')) throw new Error('Key must start with e')

  const assigner = errors[opt.Key].default

  if (!assigner || typeof assigner === 'boolean')
    throw new Error(`Key ${opt.Key} not found in errors`)

  data.responses[opt.Key.substring(1, 4)] = restErrorResponse(assigner)
}

export const error = _(_error)

/**
 * @type {import('./_.js').RawComponent<{
 *  required?: boolean,
 *  description?: string,
 *  content: import("json-schema").JSONSchema7,
 *  partial?: boolean,
 *  removeReadOnly?: boolean,
 * }>}
 */
const _body = ({ data, actions }, opt) => {
  // todo: implement partial and removeReadOnly
  // you ganna fetch the schema and remove the readOnly fields and required field
  data.requestBody = {
    description: opt.description || '',
    required: opt.required === undefined ? true : opt.required,
    content: {
      'application/json': {
        // @ts-ignore
        schema: opt.content,
      },
    },
  }

  if (!opt.partial)
    data.responses['401'] = restErrorResponse(
      errors.e400SomeFieldsRequired.default
    )
}

export const body = _(_body)

/**
 * @type {import('./_.js').RawComponent}}
 */
const _byId = ({ data, actions }) => {
  if (!data.parameters) data.parameters = []

  actions.addComponent((_) => _.parameters.byId, {
    in: 'header',
    name: 'Authorization',
    schema: { type: 'string', example: 'Bearer xxxxx' },
    required: true,
  })

  data.parameters.push({
    $ref: '#/components/parameters/byId',
  })

  data.responses['404'] = restErrorResponse(
    errors.e404ResourceWasNotFound.default
  )
}

export const byId = _(_byId)

/**
 * @type {import('./_.js').RawComponent}}
 */
const _delete_ = ({ data, actions }) => {
  // todo: implement failed to delete

  data.responses['204'] = {
    description: 'Success',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              // @ts-ignore
              type: 'null',
            },
            error: {
              // @ts-ignore
              type: 'null',
            },
          },
        },
      },
    },
  }
}

export const delete_ = _(_delete_)

/**
 * @type {import('./_.js').RawComponent<{
 *  data: import("json-schema").JSONSchema7,
 *  paged?: boolean,
 *  create?: boolean,
 * }>}
 */
const _fetch = ({ data, actions }, opt) => {
  opt.data = { $ref: opt.data.$id }

  var status = opt.create ? '201' : '200'
  data.responses[status] = {
    description: 'Success',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            // @ts-ignore
            data: opt.paged
              ? {
                  type: 'array',
                  items: opt.data,
                }
              : opt.data,
            error: {
              // @ts-ignore
              type: 'null',
            },
          },
        },
      },
    },
  }
}

export const fetch = _(_fetch)
export const create = _(
  /** @type {typeof _fetch} */ (ctx, opt) =>
    _fetch(ctx, { ...opt, create: true })
)

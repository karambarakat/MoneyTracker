import { OpenAPIV3 as v3 } from 'openapi-types'

export type option = {
  type: 'meta'
  tag?: string
  description?: string
  summary?: string
}

function meta(
  op: v3.OperationObject,
  options: option,
  trap: { path: (string | number | Symbol)[]; rootDoc: v3.Document }
) {
  options.tag && !op.tags && (op.tags = [])
  options.tag && !op.tags.includes(options.tag) && op.tags.push(options.tag)
  options.description && (op.description = options.description)
  options.summary && (op.summary = options.summary)
}

export default meta

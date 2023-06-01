import { OpenAPIV3 as v3 } from 'openapi-types'
import { docType } from '../proxy'

export type option = {
  type: 'meta'
  tag?: string
  description?: string
  summary?: string
}

function meta(
  op: v3.OperationObject,
  options: option,
  trap: { path: (string | number | Symbol)[]; rootDoc: docType }
) {
  if (options.tag) {
    if (!op.tags) op.tags = []
    if (!op.tags.includes(options.tag)) op.tags.push(options.tag)
  }
  if (options.description) op.description = options.description
  if (options.summary) op.summary = options.summary
}

export default meta

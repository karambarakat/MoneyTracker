import jsonTraverse from 'json-schema-traverse'

export const jsonSchema = {
  type: 'object',
  properties: {
    $ref: {
      type: 'string',
      format: 'uri-reference',
    },
    key: {
      $ref: '#',
    },
    default: {
      type: 'string',
      enum: ['keepAsKey', 'dereference', 'keepAsRef', 'patch'],
    },
    // todo
    patch: {},
  },
  additionalProperties: false,
}

export function traverse(
  schema: any,
  jsonPtr: any,
  rootSchema: any,
  parentJsonPtr: any,
  parentKeyword: any,
  parentSchema: any,
  keyIndex: any
) {
  if (schema['x-relation']) {
    const key = keyIndex ? keyIndex : parentKeyword
    const ref = keyIndex ? parentSchema[parentKeyword] : parentSchema

    switch (schema['x-relation'].default) {
      case 'keepAsKey':
        ref[key] = schema['x-relation'].key
        break
      case 'dereference':
        throw new Error(
          'opeanapi builder: default=dereference not implemented yet'
        )
      case 'patch':
        throw new Error('opeanapi builder: default=patch not implemented yet')
      case 'keepAsRef':
        ref[key] = schema['x-relation'].$ref
        break
      default:
        throw new Error('opeanapi builder: unsupported x-relation.default')
    }
  }
}

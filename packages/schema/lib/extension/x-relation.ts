import { JSONSchemaType } from 'ajv'
import { XRelation } from 'json-schema'
import { traverseFn } from '../../utils/schemaInterface'
import traverse0 from 'json-schema-traverse'
import _ from 'lodash'
import { applyPatch } from 'fast-json-patch'

export const traverse: traverseFn = async function (
  this,
  schema,
  { parentPointer, keyIndex, rootSchema, pointer, parentSchema }
) {
  if ('x-relation' in schema) {
    type xx = { ['x-relation']: XRelation }

    // 1. keep a copy before implementing any change (mediator.set)
    const copy = _.cloneDeep(schema as xx)['x-relation']

    // 2. set new value for x-relation
    Reflect.deleteProperty(schema, 'x-relation')

    // 2. set new value for x-relation
    if ('keepAsAKey' in copy) {
      Object.assign(schema, { type: 'string' })
      return
    }

    if ('modify' in copy) {
      // 3. based on the other modifiers do some work (mediate.get)
      copy.modify.partial &&
        applyPatch(copy.source, [
          {
            op: 'replace',
            path: '/required',
            value: [],
          },
        ])

      // 3. based on the other modifiers do some work (mediate.get)
      if (copy.modify.removeKey) {
        copy.modify.removeKey.forEach((key) => {
          if (key in copy.source) throw new Error('no key: ' + key)
          applyPatch(copy.source, [
            {
              op: 'remove',
              path: '/properties/' + key,
            },
          ])

          // 4. remove required for some keys
          if ('required' in copy.source) {
            copy.source.required = copy.source.required?.filter(
              (v) => v !== key
            )
          }
        })
      }

      const xxOnly = copy.modify.removeReadOnly
        ? 'readOnly'
        : copy.modify.removeWriteOnly
        ? 'writeOnly'
        : undefined

      xxOnly &&
        traverse0(
          copy.source,
          (
            schema: object,
            pntr,
            root,
            parentPnt,
            parentKey,
            parentSchema,
            keyI
          ) => {
            if (xxOnly in schema) {
              if (pntr === '') throw new Error('to be implemented')

              Reflect.deleteProperty(parentSchema[parentKey], keyI)
              // console.log({})
              if ('required' in parentSchema) {
                console.log('req', {
                  parentSchema,
                  keyIndex,
                  keyI,
                  req: parentSchema.required,
                  copy,
                  xxOnly,
                })

                // 4. remove required for some keys
                parentSchema.required = parentSchema.required.filter(
                  (v) => v !== keyI
                )
              }

              if (parentSchema[parentKey] instanceof Array) {
                parentSchema[parentKey] = (
                  parentSchema[parentKey] as Array<any>
                ).filter((val) => typeof val !== 'undefined')
              }
            }
          }
        )

      Object.assign(schema, copy.source)
    }
  }
}

export const jsonSchema: JSONSchemaType<XRelation> = {
  type: 'object',
  required: ['source'],
  oneOf: [
    {
      type: 'object',
      properties: {
        source: { $ref: '#' },
        keepAsAKey: { type: 'boolean', enum: [true] },
      },
    },
    {
      type: 'object',
      properties: {
        source: { $ref: '#' },
        modify: {
          type: 'object',
          properties: {
            partial: {
              nullable: true,
              type: 'boolean',
            },
            removeReadOnly: {
              nullable: true,
              type: 'boolean',
            },
            removeWriteOnly: {
              nullable: true,
              type: 'boolean',
            },
            removeKey: {
              nullable: true,
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  ],
}

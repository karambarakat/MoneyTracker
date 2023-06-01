import parser from '@apidevtools/json-schema-ref-parser'
import { ParserOptions } from '@apidevtools/json-schema-ref-parser/dist/lib/options'
import JsonSchemaTraverse, { Options } from 'json-schema-traverse'
import _deasync from 'deasync'
import { filter } from './types'
import { JSONSchema7 } from 'json-schema'
import deref from './derefWrapper'

export type traverseFn = (
  this: schemaInterface<any>,
  schema: Parameters<filter<Options['cb']>>['0'],
  ctx: {
    pointer: Parameters<filter<Options['cb']>>['1']
    rootSchema: Parameters<filter<Options['cb']>>['2']
    parentPointer?: Parameters<filter<Options['cb']>>['3']
    parentKeyword?: Parameters<filter<Options['cb']>>['4']
    parentSchema?: Parameters<filter<Options['cb']>>['5']
    keyIndex?: Parameters<filter<Options['cb']>>['6']
  }
) => Promise<void>

// type inferId<T, prefix extends string> = T extends T
//   ? T extends Array<infer I>
//     ? I extends { $id: `${prefix}${infer SubString}` }
//       ? SubString
//       : never
//     : never
//   : never

export default class schemaInterface<
  Prefix extends string,
  T extends { $id: string }[] = { $id: string }[]
> {
  __resolve: ParserOptions['resolve']
  __schemas: T
  __options:
    | {
        traverse?: traverseFn[]
        transform?: (schema: JSONSchema7) => JSONSchema7
        prefix?: Prefix
      }
    | undefined

  constructor(schemas: T, options?: schemaInterface<Prefix, T>['__options']) {
    this.__schemas = schemas
    this.__options = options
  }

  async traverse(schema: object) {
    for (const fn of this.__options?.traverse ?? []) {
      await new Promise((resolve) => {
        JsonSchemaTraverse(schema, {
          allKeys: true,
          cb: (
            schema,
            pointer,
            rootSchema,
            parentPointer?,
            parentKeyword?,
            parentSchema?,
            keyIndex?
          ) => {
            fn.call(this, schema, {
              pointer,
              rootSchema,
              parentPointer,
              parentKeyword,
              parentSchema,
              keyIndex,
            })
            resolve(null)
          },
        })
      })
    }
  }

  async get<A extends inferId<T, Prefix>>($ref: A, anchor?: string) {
    const bundled = await deref<T, `${Prefix}${A}`>(this.__schemas, '') //as typeof bundle)<T, A>('')

    this.traverse(bundled)

    return bundled
  }
}

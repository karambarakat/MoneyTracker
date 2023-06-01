import { JSONSchema7 } from 'json-schema' // imported to override/augment
import 'openapi-types'
import type { Operation } from 'fast-json-patch'

/**
 * implementation found at `packages\schema\json-schema\index.js`
 */
declare module 'json-schema' {
  interface Patch {
    source: JSONSchema7
    with: Operation[]
  }
  interface Merge {
    source: JSONSchema7
    with: JSONSchema7[]
  }

  export type XRelation =
    | {
        source: { $ref: string } | JSONSchema7
        modify: {
          partial?: boolean
          removeReadOnly?: boolean
          removeWriteOnly?: boolean
          removeKey?: string[]
        }
      }
    | { source: { $ref: string } | JSONSchema7; keepAsAKey: true }

  export interface JSONSchema7 {
    ['x-relation']?: XRelation
    ['x-error']?: number
    $patch?: Patch
    $merge?: Merge
  }
}

/// <reference path="../../index.d.ts" />
import { JSONSchema7 } from 'json-schema'
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
        $ref: string
        key: JSONSchema7
        default?: 'dereference'
        patch: unknown
      }
    | {
        $ref: string
        key: JSONSchema7
        default?: 'dereference' | 'keepAsKey' | 'keepAsRef'
      }

  export interface JSONSchema7 {
    ['x-relation']?: XRelation
    ['x-error']?: number
    $patch?: Patch
    $merge?: Merge
  }
}

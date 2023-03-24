import 'json-schema'
import type { Operation } from 'fast-json-patch'

/**
 * implementation found at `packages\schema\json-schema\index.js`
 */
declare module "json-schema" {
  interface Patch {
    source: JSONSchema7
    with: Operation[]
  }
  interface Merge {
    source: JSONSchema7
    with: JSONSchema7[]
  }
  interface JSONSchema7 {
    ['x-remove_read_only']?: boolean;
    ['x-partial']?: boolean;
    $patch?: Patch
    $merge?: Merge
  }

  export type ThisSchema = JSONSchema7
}


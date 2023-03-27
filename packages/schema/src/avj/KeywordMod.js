/// <reference types="../../index.d.ts" />
// @ts-check
/**
 * @type {import('ajv').Vocabulary extends Array<infer R> ? R : never}
 */
export const keywordMod = {
  schemaType: 'boolean',
  keyword: 'custom',
  validate: () => true,
}

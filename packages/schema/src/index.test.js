/// <reference types="jest" />
/// <reference types="../index.d.ts" />
// @ts-check
import Ajv from 'ajv'
import { keywordMod } from './avj/KeywordMod'

const myAvg = new Ajv({ keywords: [keywordMod], allErrors: true })

test('keywordMod', () => {
  myAvg.addSchema({
    $id: 'test',
    type: 'object',
    properties: {
      a: { type: 'string' },
      b: { type: 'string' },
    },
    required: ['a'],
  })

  const validate = myAvg.compile({
    $ref: 'test',
    custom: true,
  })

  expect(validate.errors).toBe(null)
  expect(validate({ a: 'a' })).toBe(true)
})

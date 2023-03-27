/// <reference types="jest" />
/// <reference types="../index.d.ts" />
// @ts-check
import myAvj from './index.js'

test('avj', () => {
  const validate = myAvj.getSchema('http://ex.ample/requests/category')
  expect(validate?.schema).toBeDefined()
})

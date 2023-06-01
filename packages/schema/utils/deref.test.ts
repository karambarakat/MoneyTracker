import deref from './derefWrapper'

describe('derefWrapper.ts', () => {
  test('', async () => {
    const schemas = [
      { $id: '/foo' as const, foo: '' },
      { $id: '/bar' as const, bar: '' },
    ]

    const bar = await deref(schemas, '/bar')
    expect(bar).toBeDefined()
    expect(bar.bar).toBeDefined()
    expect(bar.foo).not.toBeDefined()

    const foo = await deref(schemas, '/foo')
    expect(foo).toBeDefined()
    expect(foo.bar).not.toBeDefined()
    expect(foo.foo).toBeDefined()
  })
})

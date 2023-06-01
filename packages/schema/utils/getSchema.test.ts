import { JSONSchema7 } from 'json-schema'
import schemaInterface from './schemaInterface'
import _ from 'lodash'
import { inspect } from 'util'

type inf<T, Pr extends string> = T extends T
  ? T extends Array<infer P>
    ? P extends { $id: `${Pr}${infer I}` }
      ? I
      : never
    : never
  : never

class Test<P extends string, A extends Array<{ $id: string }>> {
  prefix: P
  init: A
  constructor(init) {
    this.init = init // as unknown as P
  }
  get(arg: inf<A, P>): string {
    return '' as unknown as string
  }
}

test('initiate', async () => {
  const schema01 = { $id: 'https://e.x/10' as const, prop: 'prop' }
  const schema02 = { $id: 'https://e.x/20' as const, prop: 'prop' }
  const schemas = [schema01, schema02]

  const schema = new schemaInterface<'https://e.x', typeof schemas>(schemas, {
    prefix: 'https://e.x',
  })

  expect(await schema.get('/10')).toEqual(schema01)
  expect(await schema.get('/20')).toEqual(schema02)
})

test('traverse', async () => {
  const log = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'http://ex.ample/log' as const,
    allOf: [
      {
        $id: '#document',
        type: 'object',
        properties: { foo1: { type: 'string' } },
      },
      {
        $id: '#timeStamped',
        type: 'object',
        properties: { foo2: { type: 'string' } },
      },
      {
        $id: '#base',
        type: 'object',
        required: ['title', 'amount', 'createdBy'],
        additionalProperties: false,
        properties: {
          title: { type: 'string' },
          amount: { type: 'number' },
          createdBy: { type: 'string', readOnly: true },
          note: { type: 'string' },
          category: {
            ['x-relation']: {
              source: { type: 'string' },
              modify: {
                removeKey: ['__v', 'createdAt', 'updatedAt', 'createdBy'],
              },
            },
          },
        },
        examples: [
          {
            title: 'buy new TV',
            amount: 400,
            createdBy: '63da2a0a643dd3aa49f5c6b1',
            note: 'new 40" plasma tv from flea market',
          },
        ],
      },
    ],
  } satisfies JSONSchema7
  const ref = {
    $id: 'http://ex.ample/ref',
    type: 'object',
    properties: {
      foo: { type: 'string' },
    },
  } satisfies JSONSchema7

  const schemas = [log, ref]

  const mock = jest.fn()

  const schema = new schemaInterface<'http://ex.ample', typeof schemas>(
    schemas,
    {
      prefix: 'http://ex.ample',
      traverse: [
        // @ts-expect-error: Type 'void' is not assignable to type 'Promise<void>'
        function (this, schema, { rootSchema, parentSchema, ...opt }) {
          mock(schema, opt)
        },
      ],
    }
  )

  await schema.get('/log')

  const call = (function* __() {
    yield* mock.mock.calls
  })()

  expect(call.next().value).toEqual([
    log,
    {
      parentKeyword: undefined,
      parentPointer: undefined,
      pointer: '',
      keyIndex: undefined,
    },
  ])
  expect(call.next().value).toEqual([
    log.allOf[0],
    {
      keyIndex: 0,
      parentKeyword: 'allOf',
      parentPointer: '',
      pointer: '/allOf/0',
    },
  ])
  expect(call.next().value).toEqual([
    log.allOf[0].properties.foo1,
    {
      keyIndex: 'foo1',
      parentKeyword: 'properties',
      parentPointer: '/allOf/0',
      pointer: '/allOf/0/properties/foo1',
    },
  ])
  expect(call.next().value).toEqual([
    log.allOf[1],
    {
      keyIndex: 1,
      parentKeyword: 'allOf',
      parentPointer: '',
      pointer: '/allOf/1',
    },
  ])
  expect(call.next().value).toEqual([
    log.allOf[1].properties.foo2,
    {
      keyIndex: 'foo2',
      parentKeyword: 'properties',
      parentPointer: '/allOf/1',
      pointer: '/allOf/1/properties/foo2',
    },
  ])
  expect(call.next().value).toEqual([
    log.allOf[2],
    {
      keyIndex: 2,
      parentKeyword: 'allOf',
      parentPointer: '',
      pointer: '/allOf/2',
    },
  ])
  expect(call.next().value).toEqual([
    log.allOf[2].properties.title,
    {
      keyIndex: 'title',
      parentKeyword: 'properties',
      parentPointer: '/allOf/2',
      pointer: '/allOf/2/properties/title',
    },
  ])
  expect(call.next().value).toEqual([
    log.allOf[2].properties.amount,
    {
      keyIndex: 'amount',
      parentKeyword: 'properties',
      parentPointer: '/allOf/2',
      pointer: '/allOf/2/properties/amount',
    },
  ])
  expect(call.next().value).toEqual([
    log.allOf[2].properties.createdBy,
    {
      keyIndex: 'createdBy',
      parentKeyword: 'properties',
      parentPointer: '/allOf/2',
      pointer: '/allOf/2/properties/createdBy',
    },
  ])
  expect(call.next().value).toEqual([
    log.allOf[2].properties.note,
    {
      keyIndex: 'note',
      parentKeyword: 'properties',
      parentPointer: '/allOf/2',
      pointer: '/allOf/2/properties/note',
    },
  ])
  expect(call.next().value).toEqual([
    log.allOf[2].properties.category,
    {
      keyIndex: 'category',
      parentKeyword: 'properties',
      parentPointer: '/allOf/2',
      pointer: '/allOf/2/properties/category',
    },
  ])
  expect(call.next().value).toEqual([
    log.allOf[2].properties.category?.['x-relation'],
    {
      keyIndex: undefined,
      parentKeyword: 'x-relation',
      parentPointer: '/allOf/2/properties/category',
      pointer: '/allOf/2/properties/category/x-relation',
    },
  ])
  expect(call.next().value).toEqual([
    // `/allOf/2/properties/category/x-relation/source` is populated
    log.allOf[2].properties.category?.['x-relation'].source,
    {
      keyIndex: undefined,
      parentKeyword: 'source',
      parentPointer: '/allOf/2/properties/category/x-relation',
      pointer: '/allOf/2/properties/category/x-relation/source',
    },
  ])
  expect(call.next().value).toEqual([
    log.allOf[2].properties.category?.['x-relation'].modify,
    {
      keyIndex: undefined,
      parentKeyword: 'modify',
      parentPointer: '/allOf/2/properties/category/x-relation',
      pointer: '/allOf/2/properties/category/x-relation/modify',
    },
  ])

  expect(call.next().done).toEqual(true)
})

// skipped: implementation is a todo
test.skip('deref: should not modify the original object (deep copy)', async () => {
  const schema01 = {
    $id: 'https://e.x/10' as const,
    properties: { foo: { type: 'foo' } },
  }
  const schema03 = {
    $id: 'https://e.x/30' as const,
    allOf: [{ $ref: '/10' }],
  }
  const schemas = [schema01, schema03]

  const schema = new schemaInterface<'https://e.x', typeof schemas>(schemas, {
    prefix: 'https://e.x',
  })

  expect(await schema.get('/30')).toEqual({
    $id: 'https://e.x/30',
    allOf: [{ $id: 'https://e.x/10', properties: { foo: { type: 'foo' } } }],
  })

  expect(schema03.allOf[0]).toEqual({ $ref: '/10' })
  expect(schema03.allOf[0]).not.toEqual({
    $id: 'https://e.x/10' as const,
    properties: { foo: { type: 'foo' } },
  })
})

test('deref', async () => {
  const schema01 = {
    $id: 'https://e.x/10' as const,
    properties: { foo: { type: 'foo' } },
  }
  const schema02 = {
    $id: 'https://e.x/20' as const,
    properties: { bar: { type: 'bar' } },
  }
  const schema03 = {
    $id: 'https://e.x/30' as const,
    allOf: [{ $ref: '/20' }, { $ref: '/10' }],
  }
  const schemas = [schema01, schema02, schema03]

  const schema = new schemaInterface<'https://e.x', typeof schemas>(schemas, {
    prefix: 'https://e.x',
  })

  expect(await schema.get('/30')).toEqual({
    $id: 'https://e.x/30',
    allOf: [
      { $id: 'https://e.x/20', properties: { bar: { type: 'bar' } } },
      { $id: 'https://e.x/10', properties: { foo: { type: 'foo' } } },
    ],
  })
})

test('getSchema: get return should by typescript`y', async () => {
  const schema01 = {
    $id: 'https://e.x/bar' as const,
    properties: { bar: { type: 'bar' } },
  }
  const schema02 = {
    $id: 'https://e.x/foo' as const,
    properties: { foo: { type: 'foo' } },
  }

  const schemas = [schema01, schema02]

  const schema = new schemaInterface<'https://e.x', typeof schemas>(schemas, {
    prefix: 'https://e.x',
  })

  // typescript compiler will throw errors; this is a sudo test
  // wrong implementation includes
  // error TSxxx: xxxxx does not exist on type JSONSchema7.
  // error TS2339: Property 'properties' does not exist on type '({ $id: "https://e.x/foo"; properties: { foo: { type: string; }; }; } | { $id: "https://e.x/foo"; properties: { bar: { type: string; }; }; })[]'.

  expect((await schema.get('/foo'))?.properties.foo.type).toBe('foo')
  expect((await schema.get('/bar'))?.properties.bar.type).toBe('bar')
})

test.todo('transform')

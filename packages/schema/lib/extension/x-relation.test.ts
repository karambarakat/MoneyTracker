import { JSONSchema7, XRelation } from 'json-schema'
import schemaInterface from '../../utils/schemaInterface'
import { traverse } from './x-relation'
import _, { cloneDeep } from 'lodash'
import { applyPatch } from 'fast-json-patch'

var schemaFoo: typeof _schemaFoo
const _schemaFoo = {
  $id: 'http://ex.mp/foo' as const,
  type: 'object',
  required: ['foo'],
  properties: {
    foo: { type: 'string', writeOnly: true },
    bar: { type: 'string', readOnly: true },
    obj: {
      oneOf: [
        { type: 'object', readOnly: true, writeOnly: true, properties: {} },
        {
          type: 'object',
          properties: {
            stay: { type: 'string' },
            foo: { type: 'string', writeOnly: true },
            bar: { type: 'string', readOnly: true },
          },
        },
      ],
    },
  },
} satisfies JSONSchema7

function init<O extends JSONSchema7 & { $id: string }>(
  object: O,
  foo = schemaFoo
) {
  const schemas = [foo, object]

  return new schemaInterface<'http://ex.mp', typeof schemas>(schemas, {
    prefix: 'http://ex.mp',
    traverse: [traverse],
  })
}

beforeEach(() => (schemaFoo = cloneDeep(_schemaFoo)))

describe('x-relation schema extension', () => {
  test('keepAsAKey: true', async () => {
    const schema = init({
      $id: 'http://ex.mp/bar' as const,
      properties: {
        bar: {
          ['x-relation']: {
            source: { $ref: '/foo' },
            keepAsAKey: true,
          },
        },
      },
    } as const)

    expect(await schema.get('/bar')).toEqual({
      $id: 'http://ex.mp/bar' as const,
      properties: {
        bar: { type: 'string' },
      },
    })
  })

  test('modify > partial', async () => {
    const schema = init({
      $id: 'http://ex.mp/bar' as const,
      properties: {
        bar: {
          ['x-relation']: {
            source: { $ref: '/foo' },
            modify: { partial: true },
          },
        },
      },
    } as const)

    expect(await schema.get('/bar')).toEqual({
      $id: 'http://ex.mp/bar' as const,
      properties: {
        bar: { ..._schemaFoo, required: [] },
      },
    })
  })

  test('modify > removeKey', async () => {
    const schema = init({
      $id: 'http://ex.mp/bar' as const,
      properties: {
        bar: {
          ['x-relation']: {
            source: { $ref: '/foo' },
            modify: { removeKey: ['foo'] },
          },
        },
      },
    })

    const c = _.cloneDeep(_schemaFoo)
    Reflect.deleteProperty(c.properties, 'foo')
    c.required = c.required.filter((val) => val !== 'foo')

    expect(await schema.get('/bar')).toEqual({
      $id: 'http://ex.mp/bar' as const,
      properties: {
        bar: c,
      },
    })
  })

  test('modify > remove ReadOnly', async () => {
    const _ref = {
      $id: 'http://ex.mp/refed' as const,
      type: 'object',
      required: ['foo'],
      properties: {
        foo: { type: 'string', writeOnly: true },
        bar: { type: 'string', readOnly: true },
        obj: {
          oneOf: [
            {
              type: 'object',
              readOnly: true,
              writeOnly: true,
              properties: {},
            },
            {
              type: 'object',
              properties: {
                stay: { type: 'string' },
                foo: { type: 'string', writeOnly: true },
                bar: { type: 'string', readOnly: true },
              },
            },
          ],
        },
      },
    }
    const schema = init(
      {
        $id: 'http://ex.mp/bar' as const,
        properties: {
          root: {
            ['x-relation']: {
              source: { $ref: '/refed' },
              modify: { removeReadOnly: true },
            },
          },
        },
      },
      _ref as any
    )
    const ref = _.cloneDeep(_ref)
    Reflect.deleteProperty(ref.properties, 'bar')
    ref.required = ref.required.filter((v) => v !== 'bar')
    Reflect.deleteProperty(ref.properties.obj.oneOf[1].properties, 'bar')
    ref.properties.obj.oneOf.shift()

    expect(await schema.get('/bar')).toEqual({
      $id: 'http://ex.mp/bar' as const,
      properties: {
        root: ref,
      },
    })
  })

  test('modify > remove ReadOnly onRoot', async () => {
    const _ref = {
      $id: 'http://ex.mp/foo' as const,
      type: 'string',
      readOnly: true,
    } satisfies JSONSchema7

    const schema = init(
      {
        $id: 'http://ex.mp/bar' as const,
        properties: {
          bar: {
            ['x-relation']: {
              source: { oneOf: [{ $ref: '/foo' }, { type: 'string' }] },
              modify: { removeReadOnly: true },
            },
          },
        },
      },
      _ref as any
    )

    expect(await schema.get('/bar')).toEqual({
      $id: 'http://ex.mp/bar' as const,
      properties: {
        bar: { oneOf: [{ type: 'string' }] },
      },
    })
  })

  test('modify > remove ReadOnly required', async () => {
    const schema = {
      $id: 'http://ex.mp/bar' as const,
      properties: {
        bar: {
          ['x-relation']: {
            source: {
              type: 'object',
              require: ['foo'],
              properties: {
                foo: { type: 'string', readOnly: true },
              },
            },
            modify: { removeReadOnly: true },
          },
        },
      },
    }

    const schemas = [schema]

    const get = new schemaInterface<'http://ex.mp', typeof schemas>(schemas, {
      prefix: 'http://ex.mp',
      traverse: [traverse],
    })

    const check = _.cloneDeep(schema) as any
    check.properties.bar['x-relation'].source.require = []
    check.properties.bar = check.properties.bar['x-relation'].source
    Reflect.deleteProperty(check.properties.bar.properties, 'foo')

    expect(await get.get('/bar')).toEqual(check)
  })

  test('modify > removeWriteOnly', async () => {
    const schema = init({
      $id: 'http://ex.mp/bar' as const,
      properties: {
        bar: {
          ['x-relation']: {
            source: { $ref: '/foo' },
            modify: { removeWriteOnly: true },
          },
        },
      },
    })

    const c = _.cloneDeep(_schemaFoo)
    Reflect.deleteProperty(c.properties, 'foo')
    Reflect.deleteProperty(c.properties.obj.oneOf[1].properties, 'foo')
    c.properties.obj.oneOf.shift()

    expect(await schema.get('/bar')).toEqual({
      $id: 'http://ex.mp/bar' as const,
      properties: {
        bar: c,
      },
    })
  })
})

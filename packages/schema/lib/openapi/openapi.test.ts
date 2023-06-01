import { JSONSchema7 } from 'json-schema'
import schemas from '../../json-schema'
import getByPropPath from '../../utils/getByPropPath'
import _ from './builder'
import {
  deAsyncCli,
  deAsyncCli as getSchema,
  getSchemaAsync,
} from './getSchema'
import getDoc from './proxy'
import { traverse as traverse_error } from '../extension/x-error'
import { traverse as traverse_relations } from '../extension/x-relation'
import schemaInterface from '../../utils/schemaInterface'

function deRef<T = unknown>(ref: T, cb: (a: T, derefed: boolean) => void) {
  // @ts-expect-error ts(2322)
  if ('$ref' in ref) {
    // ref.$ref === '#/components/schemas/'
    const { $ref } = ref
    if (typeof $ref === 'string' && $ref.startsWith('#')) {
      const val = getByPropPath(doc, $ref.substring(2).split('/'))
      if (!val) throw new Error(`deref: ${$ref} not found`)
      return cb(val, true)
    }
    throw new Error(`deref: deref\`ing ${ref} not implemented`)
  }
  cb(ref, false)
}

var doc

beforeEach(() => {
  doc = getDoc({
    title: 'myPocket',
    version: '1.0.0',
  })
})

test('basic v3 document', () => {
  expect(doc).toEqual({
    openapi: '3.0.0',
    info: { title: 'myPocket', version: '1.0.0' },
    paths: {},
  })
})

test('proxy: setting on the spot', () => {
  doc.paths['/get/get'].put = { responses: {} }
  expect(doc.paths['/get/get']).toBeDefined()
  doc.components.schema.hi = { type: 'string' }
  expect(doc.components.schema.hi).toBeDefined()
})

test('integrate with builder pattern', () => {
  doc.paths['/get/get'].put = _.build([
    { type: 'meta', description: 'hi', summary: 'hi', tag: 'hi' },
  ])

  expect(doc.paths['/get/get'].put).not.toEqual(
    _.build([{ type: 'meta', description: 'hi', summary: 'hi', tag: 'hi' }])
  )
})

test.todo('step: create')

test.todo('step: update')

test.todo('step: delete')

test.todo('step: read')

test('step: byId', () => {
  doc.paths['/get/get'].put = _.build([{ type: 'byId' }])

  deRef(doc.paths['/get/get'].put.parameters[0], (doc, derefed) => {
    expect(derefed).toBe(true)
    expect(doc.name).toEqual('id')
  })

  expect(doc.paths['/get/get'].put.responses['404']).toBeDefined()

  deRef(doc.paths['/get/get'].put.responses['404'], (doc, derefed) => {
    expect(derefed).toBe(true)
    expect(doc.content).toBeDefined()
  })
})

const errors = schemas
  .filter((x) => x['x-error'])
  .map((e) => ({
    ['x-error']: e['x-error'],
    $id: e.$id.replace('http://ex.ample/errors/', '') as any,
  }))

test('step: mayThrow', () => {
  var count = 0
  for (const err of errors) {
    count++
    doc.paths[`/get/get${count}`].put = _.build([
      { type: 'mayThrow', error: err.$id },
    ])

    deRef(
      doc.paths[`/get/get${count}`].put.responses[err['x-error']],
      (doc, derefed) => {
        expect(derefed).toBe(true)
        expect(doc.content).toBeDefined()
      }
    )
  }
})

test('step: meta', () => {
  doc.paths['/get/get'].put = _.build([
    { type: 'meta', description: 'foo', summary: 'foo', tag: 'foo' },
  ])

  expect(doc.paths['/get/get'].put.description).toEqual('foo')
  expect(doc.paths['/get/get'].put.summary).toEqual('foo')
  expect(doc.paths['/get/get'].put.tags).toEqual(['foo'])
})

test('step: request', () => {})

test('step: security', () => {
  doc.paths['/get/get'].put = _.build([{ type: 'security', subType: 'basic' }])
  expect(doc.paths['/get/get'].put.security).toContainEqual({ basic: [] })
  expect(doc.components.securitySchemes.basic).toBeDefined()

  doc.paths['/get/get'].put = _.build([{ type: 'security', subType: 'bearer' }])
  expect(doc.paths['/get/get'].put.security).toContainEqual({ bearer: [] })
  expect(doc.components.securitySchemes.bearer).toBeDefined()
})

test('step: request (no ref to schema)', () => {
  doc.paths['/get/get'].put = _.build([
    { type: 'request', schema: { type: 'string' } },
  ])

  deRef(
    doc.paths['/get/get'].put.requestBody.content['application/json'],
    (doc, derefed) => {
      expect(derefed).toBe(false)
      expect(doc.schema.type).toEqual('string')
    }
  )
})

test.skip('step: request (ref to schema)', () => {
  doc.paths['/get/get'].put = _.build([
    { type: 'request', schema: { $ref: 'mySchema::components/schemas/hi' } },
  ])

  deRef(
    doc.paths['/get/get'].put.requestBody.content['application/json'],
    (doc, derefed) => {
      expect(derefed).toBe(true)
      expect(doc).toBeDefined()
    }
  )
})

describe('getSchmea', () => {
  test('async', async () => {
    const schema = await getSchemaAsync('/errors/BasicTokenFailed')
    expect(schema).toBeDefined()
    expect(schema?.$id?.includes('/errors/BasicTokenFailed')).toBeTruthy()
  })

  test('deasync', () => {
    const schema = deAsyncCli('/errors/BasicTokenFailed')
    expect(schema).toBeDefined()
    expect(schema?.$id?.includes('/errors/BasicTokenFailed')).toBeTruthy()
  })
})

import _ from './builder'
import { option } from './operation/mayThrow'
import getDoc from './proxy'
import { inspect } from 'util'

function getRecursively(obj: object, path) {
  if (typeof obj === 'object' && obj !== null && path.length > 0) {
    const [key, ...rest] = path
    return getRecursively(obj[key], rest)
  }
  return obj
}

function deRef<T = unknown>(ref: T, cb: (a: T, derefed: boolean) => void) {
  // @ts-expect-error ts(2322)
  if ('$ref' in ref) {
    // ref.$ref === '#/components/schemas/'
    const { $ref } = ref
    if (typeof $ref === 'string' && $ref.startsWith('#')) {
      const val = getRecursively(doc, $ref.substring(2).split('/'))
      expect(val).toBeDefined()
      return cb(val, true)
    }
    throw new Error('not implemented')
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
    expect(doc.content).toBeDefined
  })
})

test('step: mayThrow', () => {
  for (const err of [
    { s: 400, e: 'e_400SomeFieldsRequired' },
    { s: 404, e: 'e_404ResourceWasNotFound' },
    { s: 401, e: 'e_401BasicTokenFailed' },
    { s: 401, e: 'e_401EmailOrPasswordIncorrect' },
    { s: 409, e: 'e_409UserAlreadyExist' },
  ] satisfies { s: number; e: option['error'] }[]) {
    doc.paths['/get/get'].put = _.build([{ type: 'mayThrow', error: err.e }])

    deRef(doc.paths['/get/get'].put.responses[err.s], (doc, derefed) => {
      expect(derefed).toBe(true)
      expect(doc.content).toBeDefined()
    })

    expect(doc.components.responses[err.e]).toBeDefined()
  }
})

test('step: meta', () => {
  doc.paths['/get/get'].put = _.build([
    { type: 'meta', description: 'hi', summary: 'hi', tag: 'hi' },
  ])

  expect(doc.paths['/get/get'].put.description).toEqual('hi')
  expect(doc.paths['/get/get'].put.summary).toEqual('hi')
  expect(doc.paths['/get/get'].put.tags).toEqual(['hi'])
})

test.todo('step: request')

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

test('step: request (ref to schema)', () => {
  doc.paths['/get/get'].put = _.build([
    // todo: to be continued
    { type: 'request', schema: { $ref: 'mySchema::components/schemas/hi' } },
  ])

  deRef(
    doc.paths['/get/get'].put.requestBody.content['application/json'],
    (doc, derefed) => {
      expect(derefed).toBe(true)
      expect(doc.schema.type).toEqual('string')
    }
  )
})

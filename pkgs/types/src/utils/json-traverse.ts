import traverse from 'json-schema-traverse'
import resolve from './resolve'

export function getDefinitions(res: NonNullable<object>) {
  const refs = Array<string>()
  traverse(res, {
    cb: function (
      schema,
      JSONPointer,
      rootSchema,
      parentJSONPointer,
      parentKeyword,
    ) {
      if (parentKeyword === 'definitions') {
        // refs.push('#' + JSONPointer)
        if ('$id' in res && typeof res.$id === 'string') {
          refs.push(res.$id + '#' + JSONPointer)
          return
        }
        refs.push(+'#' + JSONPointer)
      }
    },
  })

  return refs
}

/**
 * test case #1 
const res = getDefinitions({
  $id: '/test',
  definitions: {
    test: {
      type: 'string',
    },
    boo: {
      type: 'object',
      properties: {
        test: {
          $ref: '#/definitions/test',
        },
      },
    },
  },
})
console.log({ res }) // { res: [ '/test#/definitions/test', '/test#/definitions/boo' ] }
// expect(res).toEqual(['/test#/definitions/test', '/test#/definitions/boo'])
*/

export function getIds(res: NonNullable<object>) {
  const refs = Array<string>()

  traverse(res, {
    cb: function (schema, JSONPointer) {
      if (JSONPointer === '') return

      if (!('$id' in schema && typeof schema.$id === 'string')) return

      if (!schema.$id) return

      const from = (res as { $id: string })?.$id || ''

      if (
        !(
          schema.$id.search(/^#[a-zA-Z.]/) === 0 ||
          schema.$id.search(/^\/[a-zA-Z.]/) === 0
        )
      ) {
        console.log('not tested', {
          to: schema.$id,
          from,
          res: resolve(from, schema.$id),
        })
      }

      refs.push(resolve(from, schema.$id))
    },
  })

  return refs
}

/**
 * test case #2

const res2 = getIds({
  $id: 'http://test.com/test',
  type: 'object',
  properties: {
    test: {
      $id: '#test',
      type: 'string',
    },
    boo: {
      $id: '#boo',
      type: 'object',
      properties: {
        test: {
          $id: '#nested',
          type: 'string',
        },
        absolute: {
          $id: '/absolute',
          type: 'string',
        },
      },
    },
  },
})

console.log({ res2 }) // { res: [ 'http://test.com/test#test', 'http://test.com/test#boo', 'http://test.com/test#nested', 'http://test.com/absolute' ] }
 */

import { HttpError } from '@utils/httpError'
import grapOnly from '@utils/grapOnly'
import isPlain from '@utils/isPlain'
import clone from 'lodash/clone'
// blueprint for extending expect
/**
type SecondParameter<T extends (...args: any) => any> = T extends (this: 'skip=>jest.MatcherContext', ...args: infer P) => any ? P : never;
declare global {
  namespace jest {
    type TypeOfMatcher<T extends jest.CustomMatcher> = (...args: SecondParameter<T>) => ReturnType<T>
    interface Matchers<R> {
      hi: TypeOfMatcher<typeof hi>
    }
  }
}
expect.extend({hi})
type ToBeArg = 'toBe' // should be treated as unknown
function hi(this: jest.MatcherContext, expect: unknown, toBe: ToBeArg): jest.CustomMatcherResult {}
expect('could be anything').hi("toBe") // correct type
 */
type SecondParameter<T extends (...args: any) => any> = T extends (
  skip: any,
  ...args: infer P
) => any
  ? P
  : never
declare global {
  namespace jest {
    type TypeOfMatcher<T extends jest.CustomMatcher, R> = (
      ...args: SecondParameter<T>
    ) => R
    interface Matchers<R> {
      toMatchHttpError: TypeOfMatcher<typeof toMatchHttpError, R>
      toCatch: TypeOfMatcher<typeof toCatch, R>
      toBeInTheShapeOf: TypeOfMatcher<typeof toBeInTheShapeOf, R>
      toLeastEqual: TypeOfMatcher<typeof toLeastEqual, R>
    }
  }
}
expect.extend({
  toBeInTheShapeOf,
  toMatchHttpError,
  toLeastEqual,
  toCatch
})

function toLeastEqual(
  this: jest.MatcherContext,
  ex: any,
  toBe: any
): jest.CustomMatcherResult {
  function __(toBe: any): any {
    const cloned = clone(toBe)
    for (const key in cloned) {
      if (Object.prototype.hasOwnProperty.call(cloned, key)) {
        if (isPlain(cloned[key])) return __(isPlain(cloned[key]))
        cloned[key] = true
      }
    }
    return cloned
  }
  expect(grapOnly(ex, __(toBe))).toEqual(toBe)

  return { pass: true, message: () => '' }
}
function* __(obj: any, path = ''): any {
  if (obj === null) return yield { path, t: '?nullable' }
  if (obj instanceof Array) {
    const first = obj[0]
    if (typeof first === 'undefined') return yield { path, t: '?[]' }
    const yieldFrom = __(first, '[')
    for (const elem of yieldFrom) {
      yield { path, t: '[' + elem + ']' }
    }
    return
  }
  if (typeof obj === 'object') {
    for (const key in obj) {
      yield* __(obj[key], path + '/' + key)
    }
    return
  }
  if (typeof obj === 'boolean') return yield { path, t: '?b' }
  if (typeof obj === 'number') return yield { path, t: '?n' }

  if (typeof obj === 'string') return yield { path, t: '?s' }
}
function __wrap(Obj: any) {
  return Array.from(__(Obj))
    .map((e: any) => `${e.path}${e.t}`)
    .sort()
}
function toBeInTheShapeOf(this: jest.MatcherContext, first: any, second: any) {
  expect(__wrap(first)).toEqual(__wrap(second))
  return { pass: true, message: () => 'in the shape of' }
}

function toMatchHttpError(
  this: jest.MatcherContext,
  error: unknown,
  to: HttpError<any>
) {
  const pass = {
    pass: true,
    message: () => 'function threw an error'
  }
  if (!error) {
    return { pass: false, message: () => 'not of type HttpError' }
  }
  expect((error as any).details).toBeInTheShapeOf(to.details)
  expect(typeof (error as any).message).toEqual('string')
  expect((error as any).status).toEqual(to.status)
  expect((error as any).name).toEqual(to.name)
  return pass
}

function toCatch(
  this: jest.MatcherContext,
  expectCB: unknown,
  afterThrowingCB: (e: Error) => void
) {
  if (!(typeof expectCB === 'function')) {
    return {
      pass: false,
      message: () =>
        'fn in `expect(fn).afterThrowing(...)` is not of type function'
    }
  }
  if (
    !(typeof afterThrowingCB === 'function') ||
    afterThrowingCB.length !== 1
  ) {
    return {
      pass: false,
      message: () =>
        'fn in `expect(...).afterThrowing(fn)` is not of type function'
    }
  }

  let toCatch_ = false
  try {
    expectCB()
  } catch (error) {
    if (error instanceof Error) {
      afterThrowingCB(error)
      toCatch_ = true
    }
  }
  return toCatch_
    ? { pass: true, message: () => 'function threw an error' }
    : {
        pass: false,
        message: () => 'function didn`t throw any error'
      }
}

export default {}

import { QueryFunctionContext } from '@tanstack/react-query'
import HttpError from 'types/src/httpErrors_default'

export function mutation<A extends Action<any, any>>(action: A) {
  return async function (args: InputOfAction<A>) {
    const meta_ = action(args)
    const res = await fetch(import.meta.env.VITE_BACKEND_API + meta_.path, {
      ...meta_,
      headers: {
        ...meta_.headers,
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhlYzQ2Y2NmOWM2MzcxNjBmMzczNjkiLCJlbWFpbCI6InVzZXJAZy5jIiwiaWF0IjoxNjg3NjkzMDk2LCJleHAiOjE2ODc4NjU4OTZ9.Yf0AYqEIzQP5fGNg8kY1Tq_LluZdhbMDgPR6EGCmIqA',
      },
    })

    const { data, error } = await res.json()

    if (error) throw new HttpError(error)

    return data
  }
}

export function query<O>({ path, ...init }: RequestInfo<O>) {
  return async function (context: QueryFunctionContext) {
    const res = await fetch(import.meta.env.VITE_BACKEND_API + path, {
      ...init,
      signal: context.signal,
      headers: {
        ...init.headers,
        // 'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDhlYzQ2Y2NmOWM2MzcxNjBmMzczNjkiLCJlbWFpbCI6InVzZXJAZy5jIiwiaWF0IjoxNjg3NjkzMDk2LCJleHAiOjE2ODc4NjU4OTZ9.Yf0AYqEIzQP5fGNg8kY1Tq_LluZdhbMDgPR6EGCmIqA',
      },
    })

    const { data, error } = await res.json()

    if (error) throw new HttpError(error)

    return data as O
  }
}

export type OutputOfAction<T> = T extends (
  Input: any,
) => RequestInfo<infer output>
  ? output
  : never

export type InputOfAction<T> = T extends (
  Input: infer input,
) => RequestInfo<unknown>
  ? input
  : never

export type Action<input = object, output = unknown> = keyof input extends never
  ? () => RequestInfo<output>
  : (input: input) => RequestInfo<output>

export type RequestInfo<output> = Parameters<typeof fetch>[1] & {
  path: string
  // will be removed by typescript compiler
  onlyTypeScript?: output
}

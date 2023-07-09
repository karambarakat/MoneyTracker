import { QueryClient } from '@tanstack/react-query'
import HttpError from 'types/dist/helpers/HttpError'
import { QueryFunctionContext } from '@tanstack/react-query'
import { get } from 'lodash'
import { getProfile } from '../utils/localProfile'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry(failureCount, error) {
        if (
          error instanceof Error &&
          `${error.name}: ${error.message}` === 'TypeError: Failed to fetch'
        )
          return false

        if (!(error instanceof HttpError)) return false

        if (error.payload.name === 'TokenFailed') return false

        if (failureCount > 2) return false

        return true
      },
    },
  },
})

function _fetch<O>(path: string, init: RequestInit) {
  return fetch(import.meta.env.VITE_BACKEND_API + path, {
    ...init,
    headers: {
      ...init.headers,
      'Content-Type': 'application/json',
      Authorization:
        get(init, 'headers.Authorization') ??
        (getProfile()?.token.replace(/^/, 'Bearer ') || ''),
    },
  })
    .then(res => res.json())
    .then(({ error, ...data }) => {
      if (error) throw new HttpError(error)
      return data.data as O
    })
}

export function mutation<I, O>(action: Action<I, O>) {
  return async function (args: I) {
    const { path, ...init } = action(args)
    const data = await _fetch<O>(path, init)
    return data
  }
}

export function query<O>({ path, ...init }: RequestInfo<O>) {
  return async function (context: QueryFunctionContext) {
    const data = await _fetch<O>(path, {
      ...init,
      signal: context.signal,
    })
    return data
  }
}

// todo: when done refactoring the backend rewrite this function or remove it
export function pagedQuery<O>(
  { path, ...init }: RequestInfo<O[]>,
  pagination: { page: number; pageSize: number },
) {
  return async function (context: QueryFunctionContext) {
    const data = await _fetch<O[]>(path, {
      ...init,
      signal: context.signal,
    })

    return {
      data: data
        .reverse()
        .slice(
          (pagination.page - 1) * pagination.pageSize,
          pagination.page * pagination.pageSize,
        )
        .reverse(),
      meta: {
        pagination: {
          page: pagination.page,
          pageSize: pagination.pageSize,
          pageCount: Math.ceil(
            (data instanceof Array ? data.length : 1) / pagination.pageSize,
          ),
          total: data instanceof Array ? data.length : 1,
        },
      },
    }
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

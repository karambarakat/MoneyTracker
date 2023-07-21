import { QueryClient, UseQueryOptions } from '@tanstack/react-query'
import HttpError from 'types/dist/helpers/http_error'
import { useQuery as useQuery_ } from '@tanstack/react-query'

import * as apis from '../api/index'

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

export function useQuery<T extends keyof typeof apis>(
  key: T,
  params: Parameters<(typeof apis)[T]>,
  options: UseQueryOptions<Awaited<ReturnType<(typeof apis)[T]>>> = {},
) {
  const fn = apis[key]

  return useQuery_({
    queryFn: () => {
      return fn(
        // @ts-ignore
        ...params,
      ) as Promise<Awaited<ReturnType<(typeof apis)[T]>>>
    },
    queryKey: [key, ...params],
    ...options,
  })
}

import { QueryClient, UseQueryOptions } from '@tanstack/react-query'
// import HttpError from 'types/dist/helpers/http_error'
import { RestError } from 'types/HttpError'
import { useQuery as useQuery_ } from '@tanstack/react-query'

import * as apis from '../api/mutations'

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

        if (!(error instanceof RestError)) return false

        if (error.code === 'ExpiredBearerToken') return false

        if (failureCount > 2) return false

        return true
      },
    },
  },
})

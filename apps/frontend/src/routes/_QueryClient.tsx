import HttpError from 'types/src/httpErrors_default'
import {
  QueryClient,
  QueryClientProvider as QueryClientProvider_,
} from '@tanstack/react-query'
import { WithChildren } from 'ui/src/utils/WithChildren'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry(failureCount, error) {
        // todo: refactoring: when done with type package refactoring come and use error.payload
        if (error instanceof HttpError && error.name === 'TokenExpiredError') {
          return false
        }

        if (failureCount > 2) {
          return false
        }

        return true
      },
    },
  },
})

export default function QueryClientProvider(p: WithChildren) {
  return (
    <QueryClientProvider_ client={queryClient}>
      {p.children}
    </QueryClientProvider_>
  )
}

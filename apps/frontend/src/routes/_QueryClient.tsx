import {
  QueryClient,
  QueryClientProvider as QueryClientProvider_,
} from '@tanstack/react-query'
import { WithChildren } from 'ui/src/utils/WithChildren'

export const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true } },
})

export default function QueryClientProvider(p: WithChildren) {
  return (
    <QueryClientProvider_ client={queryClient}>
      {p.children}
    </QueryClientProvider_>
  )
}

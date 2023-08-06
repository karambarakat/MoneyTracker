import React from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import MetaContext from './src/routes/_MetaContext'
import Loading from './src/routes/_Loading'
import ErrorComponent from './src/routes/_Error'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './src/lib/react-query'

export default function Providers({ Story }: { Story: () => JSX.Element }) {
  return (
    <MetaContext>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary FallbackComponent={ErrorComponent}>
            {
              Story() // prettier 😠
            }
          </ErrorBoundary>
        </Suspense>
      </QueryClientProvider>
    </MetaContext>
  )
}

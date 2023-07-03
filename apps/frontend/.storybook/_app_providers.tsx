import React from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import QueryClientProvider from '../src/routes/_QueryClient'
import MetaContext from '../src/routes/_MetaContext'
import { ColorModeProvider } from 'ui/src/colorMode/provider'
import Loading from '../src/routes/_Loading'
import ErrorComponent from '../src/routes/_Error'

export default function Providers({ Story }: { Story: () => JSX.Element }) {
  return (
    <ColorModeProvider>
      <MetaContext>
        <QueryClientProvider>
          <Suspense fallback={<Loading />}>
            <ErrorBoundary FallbackComponent={ErrorComponent}>
              {
                Story() // prettier 😠
              }
            </ErrorBoundary>
          </Suspense>
        </QueryClientProvider>
      </MetaContext>
    </ColorModeProvider>
  )
}

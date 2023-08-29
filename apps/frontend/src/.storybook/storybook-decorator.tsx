import React from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import MetaContext from '../routes/_MetaContext'
import { BrowserRouter, Router } from 'react-router-dom'
import Loading from '../routes/_Loading'
import ErrorComponent from '../routes/_Error'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../api/client'

export default function Providers({ Story }: { Story: () => JSX.Element }) {
  return (
    <>
      {/* <BrowserRouter> */}
      {/* <Router location={''} navigator={null as any}> */}
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
      {/* </Router> */}
      {/* </BrowserRouter> */}
    </>
  )
}

import { Decorator } from '@storybook/react'

export const frontend_decorator: Decorator = (Story: any, ctx: any) => {
  if (!Object.keys(ctx.parameters).includes('page')) {
    return <Story />
  }

  return Providers({ Story })
}

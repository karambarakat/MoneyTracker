/// <reference path="../../types/SB.d.ts" />
import React from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import MetaContext from '../routes/_MetaContext'
import { BrowserRouter, Router } from 'react-router-dom'
import Loading from '../routes/_Loading'
import ErrorComponent from '../routes/_Error'
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import { queryClient } from '../api/client'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function ProvidersDeprecated({ Story }: { Story: () => JSX.Element }) {
  return (
    <>
      <BrowserRouter>
        <Router location={''} navigator={null as any}>
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
        </Router>
      </BrowserRouter>
    </>
  )
}

// import {  } from '@storybook/react'
// import {} from 'SB'

export const frontend_decorator: SB.Decorator[] = [
  (Story, ctx) => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          {
            Story() // prettier 😠
          }
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </>
    )
  },

  (Story, ctx) => {
    if (ctx.parameters?.query) {
      useQueryClient().clear()
      return <Story />
    }

    return <Story />
  },
]

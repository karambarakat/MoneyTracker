/// <reference path="../../types/SB.d.ts" />
import React, { useMemo } from 'react'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import MetaContext from '../routes/_MetaContext'
import { BrowserRouter, Router } from 'react-router-dom'
import Loading from '../routes/_Loading'
import ErrorComponent from '../routes/_Error'
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query'
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

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: false,
      useErrorBoundary: false,
    },
  },
})

export const frontend_decorator: SB.Decorator[] = [
  // (Story, ctx) => {
  //   if (!ctx.parameters?.query) {
  //     return Story()
  //   }

  //   const client = useQueryClient()

  //   client.clear()
  //   ctx.parameters.query.data?.forEach(({ data, key }) => {
  //     client.setQueryData(key, data)
  //   })

  //   return <Story />
  // },

  (Story, ctx) => {
    const CleanUp = useMemo(() => {
      return () => {
        const client = useQueryClient()

        client.clear()
        ctx.parameters?.query?.data?.forEach(({ data, key }) => {
          client.setQueryData(key, data)
        })

        return <></>
      }
    }, [ctx.parameters?.query])

    if (ctx.parameters?.query) {
      return (
        <QueryClientProvider client={queryClient}>
          {Story()}
          <CleanUp />
          <ReactQueryDevtools />
        </QueryClientProvider>
      )
    }
    return Story() // prettier 😠
  },
]

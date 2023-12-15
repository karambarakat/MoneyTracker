import 'twin.macro'
import React from 'react'
import ReactDOM from 'react-dom'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MetaContext from './routes/_MetaContext'
import GlobalStyles from 'ui/src/GlobalStyles'
import { ColorModeProvider } from 'ui/src/colorMode/provider'
import AppShellLayout from './routes/_Layout'

import Loading from './routes/_Loading'

const Categories = lazy(() => import('./routes/categories'))
const Index = lazy(() => import('./routes/index'))

import { ErrorBoundary } from 'react-error-boundary'
import ErrorComponent from './routes/_Error'
import { ReactQueryDevtoolsProduction } from './utils/ReactQueryDevTool'
import Profile from './routes/Profile'
import { queryClient } from './api/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as Auth from './routes/_Auth'

function App() {
  return (
    <ColorModeProvider>
      <MetaContext>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <ErrorBoundary FallbackComponent={ErrorComponent}>
                <Routes>
                  <Route element={<Auth.Protected />}>
                    <Route element={<AppShellLayout />}>
                      <Route index element={<Index />} />
                      <Route path="categories" element={<Categories />} />
                      <Route path="profile/*" element={<Profile />} />
                    </Route>
                  </Route>
                  <Route path="auth/*" element={<Auth.Authentication />} />
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <ReactQueryDevtoolsProduction />
        </QueryClientProvider>
      </MetaContext>
    </ColorModeProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

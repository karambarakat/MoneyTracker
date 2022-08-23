import React, { PropsWithChildren, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { lazy, Suspense } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import MainLayout from '@routes/_Layout'
import MantineSetUp from '@components/MantineSetUp'
import Authenticate from '@routes/_Auth'
import { Provider as Redux } from 'react-redux'
import { store } from '@redux/index'
import GoogleCallback from '@routes/auth/google/callback'
import MyRoutes from '@components/ReactRouter/RoutesWithModal'

const Index = lazy(() => import('@routes/index'))
const About = lazy(() => import('@routes/about'))
const E404 = lazy(() => import('@routes/_E404'))

function App() {
  return (
    <MantineSetUp>
      <Redux store={store}>
        <BrowserRouter>
          <Suspense fallback={'loading ...'}>
            <MyRoutes>
              <Route element={<Authenticate />}>
                {/* PROTECTED ROUTES --- ONLY USERS WITH VALID TOKEN CAN VIEW THE CONTENT */}
                <Route element={<MyRoutes.Modal />}>
                  <Route path="about" element={<About />} />
                </Route>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Index />} />
                </Route>
                {/* PROTECTED ROUTES --- ONLY USERS WITH VALID TOKEN CAN VIEW THE CONTENT */}
              </Route>
              {/* UNPROTECTED ROUTES */}
              <Route
                path="/auth/google/callback"
                element={<GoogleCallback />}
              />
              <Route path={'*'} element={<E404 />} />
              {/* UNPROTECTED ROUTES */}
            </MyRoutes>
          </Suspense>
        </BrowserRouter>
      </Redux>
    </MantineSetUp>
  )
}

function ProtectedRoutes({ children }: PropsWithChildren<any>) {
  return <Routes location={'/about'}>{children}</Routes>
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

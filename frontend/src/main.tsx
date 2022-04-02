import React, { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'

import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '@routes/_Layout'
import MantineSetUp from '@components/MantineSetUp'
import Authenticate from '@routes/_Auth'
import { Provider as Redux } from 'react-redux'
import { store } from '@redux/index'

const Index = lazy(() => import('@routes/index'))
const About = lazy(() => import('@routes/about'))
const E404 = lazy(() => import('@routes/_E404'))

function App() {
  return (
    <MantineSetUp>
      <Redux store={store}>
        <BrowserRouter>
          <Suspense fallback={'loading ...'}>
            <Routes location={'/about'}>
              <Route element={<Authenticate />}>
                <Route path='/' element={<MainLayout />}>
                  <Route index element={<Index />} />
                  <Route path='about' element={<About />} />
                </Route>
              </Route>
              <Route path={'*'} element={<E404 />} />
            </Routes>
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

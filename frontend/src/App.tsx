import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Global, MantineProvider, Text } from '@mantine/core'
import MainLayout from '@routes/_Layout'

const Index = lazy(() => import('@routes/index'))
const About = lazy(() => import('@routes/about'))
const E404 = lazy(() => import('@routes/_E404'))

function App() {
  return (
    <MantineProvider>
      <MantineGlobal />
      <BrowserRouter>
        <Suspense fallback={'loading ...'}>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Index />} />
              <Route path='about' element={<About />} />
            </Route>
            <Route path={'*'} element={<E404 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MantineProvider>
  )
}

function MantineGlobal() {
  return (
    <Global
      styles={(theme) => ({
        '*, *::before, *::after': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
      })}
    />
  )
}

export default App

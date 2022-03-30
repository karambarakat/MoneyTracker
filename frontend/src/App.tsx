import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { lazyLoadingFunction } from '@interfaces/react'
import E404 from '@pages/E404'

const ROUTES = import.meta.glob('/src/routes/**/[a-z[]*.tsx')

const importToRoutes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/routes|index|\.tsx$/g, '')
    .replace(/\[\.{3}.+\]/, '*')
    .replace(/\[(.+)\]/, ':$1')

  return {
    key: route,
    path,
    Component: React.lazy(ROUTES[route] as lazyLoadingFunction),
  }
})

console.log(importToRoutes.map((path) => path.path))

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route>
            {importToRoutes.map((obj) => {
              return (
                <Route
                  key={obj.key}
                  path={obj.path}
                  element={
                    <Suspense fallback={'loading ...'}>
                      <obj.Component />
                    </Suspense>
                  }
                />
              )
            })}
          </Route>
          <Route
            path={'*'}
            element={
              <Suspense fallback={'loading ...'}>
                <E404 />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App

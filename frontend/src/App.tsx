import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '@routes/_Layout'
import MantineSetUp from '@components/MantineSetUp'

const Index = lazy(() => import('@routes/index'))
const About = lazy(() => import('@routes/about'))
const E404 = lazy(() => import('@routes/_E404'))

function App() {
  return (
    <MantineSetUp>
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
    </MantineSetUp>
  )
}

export default App

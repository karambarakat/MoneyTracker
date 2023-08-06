import { QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import { client } from './main-query'
import { Suspense } from 'react'
import { apis } from './api/type'

export default function Experiment() {
  return (
    <div tw="w-[300px] h-[300px] flex flex-col">
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <nav tw="flex gap-2 bg-indigo-300">
            <span tw="flex-1">home</span>
            <NavLink to={'/'}>home</NavLink>
            <NavLink to={'/about'}>about</NavLink>
          </nav>

          <div tw="flex-1">
            <Suspense fallback={<div>loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/more" element={<More />} />
              </Routes>
            </Suspense>
          </div>

          <div>
            read more <Link to="/more">more</Link>
          </div>

          <Info />

          <button
            onClick={() => {
              client.invalidateQueries(['test'])
            }}
          >
            refresh
          </button>
          <ReactQueryDevtools initialIsOpen={true} panelPosition="bottom" />
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  )
}

function Info() {
  const query = useIndex({ suspense: false })

  return (
    <>
      <div>status: {query?.status}</div>
      <div>fetch: {query?.fetchStatus}</div>
    </>
  )
}

function useIndex(obj?: object) {
  return useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return 'test'
    },
    suspense: true,
    ...obj,
  })
}

function Index() {
  const data = useIndex()
  return (
    <div>
      index: {data.data} {data.isFetching ? 'fetching' : 'not fetching'}
    </div>
  )
}

function More() {
  const data = useQuery({
    queryKey: ['more'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return 'more'
    },
    suspense: true,
  })

  return <div>more: {data.data}</div>
}

function About() {
  return <div>about</div>
}

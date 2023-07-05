import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'

const ReactQueryDevtoolsProductionLazy = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(d => ({
    default: d.ReactQueryDevtools,
  })),
)

export function ReactQueryDevtoolsProduction() {
  const [showDevtools, setShowDevtools] = React.useState(false)

  React.useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools(old => !old)
  }, [])

  return showDevtools ? (
    <React.Suspense fallback={null}>
      <ReactQueryDevtoolsProductionLazy />
    </React.Suspense>
  ) : null
}

export default function ReactQueryDevTools_() {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      <ReactQueryDevtoolsProduction />
    </>
  )
}

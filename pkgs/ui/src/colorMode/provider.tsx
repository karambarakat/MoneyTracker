import { createContext, useContext, useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'

type mode = 'light' | 'dark'
const _context = createContext<[mode, (m: mode | 'system') => void]>([
  'light',
  () => {
    throw new Error('no context provided')
  },
])

// see [Supporting system preference and manual selection](https://tailwindcss.com/docs/dark-mode#:~:text=Supporting%20system%20preference%20and%20manual%20selection)
function setModeOnBrowser(m: mode | 'system') {
  if (!localStorage || !document) return

  if (m === 'system') {
    localStorage.removeItem('theme')
    // class will be removed by head(), I do it here just in case
    document.documentElement.classList.remove('dark')
    return
  }

  localStorage.theme = m

  m === 'dark'
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark')
}

const head = () => {
  if (!window) return

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export function ColorModeProvider({
  children,
  mode,
}: PropsWithChildren<{ mode: mode }>) {
  const [_mode, _setMode] = useState<mode>(mode)

  const setMode = (m: mode | 'system') => {
    const mode =
      m === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : m

    _setMode(mode)

    if (m === 'system') {
      localStorage.removeItem('theme')
      document.documentElement.classList.remove('dark')
    } else if (m === 'dark') {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
  }

  // // changing the props
  useEffect(() => {
    setMode(mode)
  }, [mode])

  // // initial setup
  // useEffect(() => {
  //   head()
  //   // bug: sb provide `dark` class for body tag
  //   document.body.classList.remove('dark')
  // }, [])

  return (
    <_context.Provider value={[_mode, setMode]}>{children}</_context.Provider>
  )
}

export const useColorMode = () => {
  const context_ = useContext(_context)
  return context_
}

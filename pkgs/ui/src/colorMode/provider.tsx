import { createContext, useContext, useEffect, useState } from 'react'
import { WithChildren } from '../utils/WithChildren'

type mode = 'light' | 'dark'

const _context = createContext<{
  mode: mode
  setMode: (to: mode | 'system') => void
  toggle: () => void
  isSystem: boolean
}>({
  isSystem: true,
  mode: 'dark',
  setMode: () => {
    throw new Error('no context provided')
  },
  toggle: () => {
    throw new Error('no context provided')
  },
})

export function ColorModeProvider({
  children,
  mode: _mode,
}: WithChildren<{ mode?: mode }>) {
  const [isSystem, setIsSystem] = useState((_mode && false) || true)
  const [mode, _setMode] = useState<mode>(_mode || 'dark')

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (mode === 'light') {
      document.documentElement.classList.remove('dark')
    }
  }, [mode])

  useEffect(() => {
    const isS = !_mode
    setMode(isS ? 'system' : _mode)
  }, [_mode])

  const setMode = (m: mode | 'system') => {
    const mode =
      m === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : m

    m === 'system' ? setIsSystem(true) : setIsSystem(false)

    _setMode(mode)

    if (m === 'system') {
      localStorage.removeItem('theme')
    } else if (m === 'dark') {
      localStorage.theme = 'dark'
    } else {
      localStorage.theme = 'light'
    }
  }

  const [goBack, setGoBack] = useState(false)
  const toggle = () => {
    setMode(
      isSystem
        ? 'dark'
        : mode === 'dark'
        ? 'light'
        : goBack
        ? 'system'
        : 'dark',
    )
    // mode === 'dark' ? setGoBack(true) : setGoBack(false)
    isSystem && mode === 'dark' ? setGoBack(true) : setGoBack(false)
    isSystem && mode === 'light' ? setGoBack(false) : setGoBack(true)
  }

  return (
    <_context.Provider value={{ mode, setMode, isSystem, toggle }}>
      {children}
    </_context.Provider>
  )
}

export const useColorMode = () => {
  const context_ = useContext(_context)
  return context_
}

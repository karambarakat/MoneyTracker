import { createContext, useContext, useEffect, useState } from 'react'
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
type State<T> = [T, Dispatch<SetStateAction<T>>]

type mode = 'light' | 'dark'
const _context = createContext<State<mode>>(['light', () => {}])

export function ColorModeProvider({
  children,
  mode
}: PropsWithChildren<{ mode?: mode }>) {
  const state = useState<'light' | 'dark'>(mode || 'dark')

  useEffect(() => {
    mode && state[1](mode)
  }, [mode])

  return <_context.Provider value={state}>{children}</_context.Provider>
}

export const useColorMode = () => {
  const context_ = useContext(_context)

  return context_
}

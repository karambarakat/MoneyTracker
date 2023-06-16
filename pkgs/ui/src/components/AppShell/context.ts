import { PropsOf } from '@emotion/react'
import { useId, useMediaQuery } from '@mantine/hooks'
import { createContext, useContext, useEffect, useState } from 'react'
import AppShell from './AppShell'

export interface AppShell_sideBar_Context {
  /**
   * whether the sidebar is overlayed on the main content
   */
  open: boolean
  /**
   * open or close the sidebar
   */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  /**
   * whether the sidebar is expanded alongside the main content
   * expansion may have been disabled
   */
  expand: 0 | 1 | 'disabled'
  /**
   * toggle the sidebar expansion
   */
  toggleExpand: () => void
  /**
   * max-width: <first breakpoint>
   */
  sm: boolean
  /**
   * max-width: <second breakpoint>
   */
  md: boolean
  /**
   * the same query used by the AppShell component returned as string
   * max-width: <first breakpoint>
   */
  sm_query: string
  /**
   * the same query used by the AppShell component returned as string
   * max-width: <second breakpoint>
   */
  md_query: string
  /**
   * the width of the screen
   * derived from `sm` and `md`
   */
  width: 'lg' | 'md' | 'sm'
  /**
   * query at which the sidebar is not expandable
   */
  disabled_query: string
  /**
   * id of the main div
   */
}

export const context = createContext<AppShell_sideBar_Context>({
  md_query: '',
  sm_query: '',
  disabled_query: '',
  open: false,
  setOpen: () => console.log('no context provider'),
  expand: 0,
  width: 'sm',
  toggleExpand: () => console.log('no context provider'),
  sm: false,
  md: false,
})

type ContextInput = Pick<PropsOf<typeof AppShell>, 'bp_md' | 'bp_sm'>

export const useAppShellContext = () => useContext(context)

export function useCreateContext(p: ContextInput): AppShell_sideBar_Context {
  const md_query = `(max-width: ${p.bp_md}px)`
  const sm_query = `(max-width: ${p.bp_sm}px)`
  const disabled_query = `(min-width: ${p.bp_md}px), (max-width: ${p.bp_sm}px)`
  const md = useMediaQuery(md_query)
  const sm = useMediaQuery(sm_query)
  const id = useId() + '-app-shell'
  const disabled = useMediaQuery(disabled_query)
  const width = md && sm ? 'sm' : md && !sm ? 'md' : 'lg'

  const [expand, setExpand] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    // when going to sm screen, hide the sidebar
    if (width === 'sm') setExpand(false)
    setOpen(false)
  }, [md, sm])

  useEffect(() => {
    // always open on large
    if (width === 'lg') setOpen(true)
  }, [sm, md, open])

  useEffect(() => {
    // close open when expanding
    if (expand) setOpen(false)
  }, [expand])

  useEffect(() => {
    // cannot expand and open at the same time
    if (expand && open) {
      console.error('cannot expand and open at the same time')
      setOpen(false)
    }
  }, [open, expand])

  return {
    md_query,
    sm_query,
    disabled_query,
    open,
    sm,
    md,
    width,
    setOpen,
    id,
    expand: disabled ? 'disabled' : expand ? 1 : 0,

    toggleExpand: () => {
      if (disabled) return
      setExpand(s => !s)
    },
  }
}

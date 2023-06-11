import 'twin.macro'
import {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  createContext,
  useRef,
} from 'react'
import { useHover, useId, useMediaQuery } from '@mantine/hooks'
import tw from 'twin.macro'
import { css } from '@emotion/react'
import media from '@src/utils/mediaCss'
import useHoverInOut from '@src/hooks/useHoverInOut'

export interface ContextInput {
  /**
   * breakpoint at which the sidebar is slidable
   */
  bp_1st: number
  /**
   * breakpoint at which the sidebar is expandable
   */
  bp_2nd: number
}

export interface AppShell_sideBar_Context {
  /**
   * whether the sidebar is overlayed on the main content
   */
  open: boolean
  /**
   * the id of the root element
   */
  rootId: string
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
   * the width of the screen
   * derived from `sm` and `md`
   */
  width: 'lg' | 'md' | 'sm'
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
}

interface Props extends ContextInput {
  /**
   * the sidebar
   */
  SideBar: JSX.Element
  /**
   * Background for the main content
   */
  Back?: (p: PropsWithChildren<object>) => JSX.Element
  /**
   * UI toggle for the sidebar expansion
   */
  Expand?: ({ disabled }: { disabled: boolean }) => JSX.Element
}

const context = createContext<AppShell_sideBar_Context>({
  md_query: '',
  sm_query: '',
  rootId: '',
  open: false,
  setOpen: () => console.log('no context provider'),
  expand: 0,
  toggleExpand: () => console.log('no context provider'),
  width: 'lg',
  sm: false,
  md: false,
})

export const useAppShellContext = () => useContext(context)

function useCreateContext(p: ContextInput): AppShell_sideBar_Context {
  const md_query = `(max-width: ${p.bp_2nd}px)`
  const sm_query = `(max-width: ${p.bp_1st}px)`
  const rootId = 'AppShell-' + useId()
  const md = useMediaQuery(md_query)
  const sm = useMediaQuery(sm_query)
  const width = md && sm ? 'sm' : md && !sm ? 'md' : 'lg'
  const [expand, setExpand] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const disabled = width === 'sm' || width === 'lg'
  useEffect(() => {
    if (sm) setExpand(false)
    setOpen(false)
  }, [sm])
  useEffect(() => {
    if (expand) setOpen(false)
  }, [expand])
  useEffect(() => {
    if (expand && open) {
      console.error('cannot expand and open at the same time')
      setOpen(false)
    }
    if (open && width === 'lg') {
      console.error('cannot open at lg')
      setOpen(false)
    }
  }, [open])
  return {
    md_query,
    sm_query,
    rootId,
    open,
    sm,
    md,
    setOpen,
    expand: disabled ? 'disabled' : expand ? 1 : 0,
    toggleExpand: () => {
      if (disabled) return
      setExpand(s => !s)
    },
    width,
  }
}

export default function AppShell({
  children,
  SideBar,
  Expand = Default_Expand,
  Back = Defaults_Back,
  ...contextProp
}: PropsWithChildren<Props>) {
  const useContext = useCreateContext(contextProp)
  const {
    expand,
    open,
    setOpen,
    toggleExpand,
    width,
    rootId,
    md,
    sm,
    sm_query,
    md_query,
  } = useContext
  const [_, ref] = useHoverInOut(500, s => {
    s === 'in' ? setOpen(true) : s === 'out' && setOpen(false)
  })
  return (
    <context.Provider value={useContext}>
      <Back>
        <div id={rootId} tw="flex min-h-screen">
          <div
            ref={ref}
            css={[
              tw`z-30 transition-transform duration-300 flex-[0_0_0]`,
              media(sm_query, tw`-translate-x-[56px]`),
              open && tw`!translate-x-0`,
            ]}
          >
            <div
              css={[
                tw`transition-[min-width,width] duration-300`,
                tw`h-full min-w-[40px] w-[40px]`,
                expand === 1 && media(md_query, tw`w-[200px]`),
                media(sm_query, tw`w-[40px]`),
                expand === 1 && tw`w-[200px]!`,
                expand === 'disabled' && tw`w-[200px]`,
              ]}
            >
              <div
                css={[
                  tw`transition-[box-shadow,width] duration-300 w-full`,
                  tw`sticky top-0`,
                  open && tw`w-[200px]!`,
                  tw`shadow-none`,
                  open && media(md_query, tw`shadow-2xl`),

                  tw`h-full max-h-screen`,
                ]}
              >
                {SideBar}
                <span onClick={() => !sm && toggleExpand()}>
                  <Expand disabled={expand === 'disabled'} />
                </span>
              </div>
            </div>
          </div>

          <div
            css={[
              open && media(sm_query, tw`opacity-50 pointer-events-auto`),
              !open && tw`opacity-0 pointer-events-none`,
              tw`bg-black/50 fixed z-10 transition-[opacity] top-0 left-0 w-full h-full`,
            ]}
            onClick={() => setOpen(false)}
          />

          <main
            css={[
              tw`w-full z-0`,
              media(sm_query, tw`-ml-[40px]`),
              open && tw`overflow-hidden h-screen`,
            ]}
          >
            {/* 544 = 600 - 54 (sidebar -translate-x) */}
            <div
              css={[
                tw`min-h-screen max-w-[800px] m-auto`,
                // todo (animation): translate-x-[24px] then translate-x-0
              ]}
            >
              <div css={[media(sm_query, tw`m-auto max-w-[540px]`)]}>
                {children}
              </div>
            </div>
          </main>
        </div>
      </Back>
    </context.Provider>
  )
}

export const Default_Expand = ({ disabled }: { disabled: boolean }) => {
  return (
    <span
      css={[
        tw`overflow-hidden absolute bottom-[20px] right-0 translate-x-[8px] w-[16px] h-[16px]`,
      ]}
    >
      <span
        css={[
          tw`transition-[translate] duration-300 transform`,
          tw`bg-slate-500 cursor-pointer rounded-full border-black`,
          tw`w-full h-full block`,
          disabled && tw`translate-y-[36px]`,
        ]}
      ></span>
    </span>
  )
}

const Defaults_Back = ({ children }: PropsWithChildren<object>) => (
  <>{children}</>
)

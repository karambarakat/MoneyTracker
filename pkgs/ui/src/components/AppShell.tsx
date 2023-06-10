import 'twin.macro'
import {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  createContext
} from 'react'
import { useMediaQuery } from '@mantine/hooks'
import tw from 'twin.macro'

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
}

const context = createContext<AppShell_sideBar_Context>({
  open: false,
  setOpen: () => console.log('no context provider'),
  expand: 0,
  toggleExpand: () => console.log('no context provider'),
  width: 'lg',
  sm: false,
  md: false
})

export const useAppShellContext = () => useContext(context)

function useCreateContext(
  p: Pick<Props, 'bp_1st' | 'bp_2nd'>
): AppShell_sideBar_Context {
  const md = useMediaQuery(`(max-width: ${p.bp_2nd}px)`)
  const sm = useMediaQuery(`(max-width: ${p.bp_1st}px)`)
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
  }, [open])
  return {
    open,
    sm,
    md,
    setOpen,
    expand: disabled ? 'disabled' : expand ? 1 : 0,
    toggleExpand: () => {
      if (disabled) return
      setExpand(s => !s)
    },
    width
  }
}

interface Props {
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
  /**
   * breakpoint at which the sidebar is slidable
   */
  bp_1st: number
  /**
   * breakpoint at which the sidebar is expandable
   */
  bp_2nd: number
}

export default function AppShell({
  children,
  SideBar,
  Expand = Default_Expand,
  Back = Defaults_Back,
  ...contextProp
}: PropsWithChildren<Props>) {
  const useContext = useCreateContext(contextProp)
  const { expand, open, setOpen, toggleExpand, width, md, sm } = useContext
  return (
    <context.Provider value={useContext}>
      <Back>
        <div tw="flex min-h-screen">
          <div
            css={[
              tw`z-30 transition-all duration-300 flex-[0_0_0] `,
              sm && tw`-translate-x-[56px]`,
              open && tw`translate-x-0`
            ]}
          >
            <div
              css={[
                tw`transition-all duration-300`,
                tw`h-full min-w-[40px] w-[200px]`,
                md && !expand && tw`!w-[40px]`,
                sm && tw`!w-[40px]`
              ]}
            >
              <div
                css={[
                  tw`transition-all duration-300 w-full`,
                  open && tw`!w-[200px]`,
                  open && md ? tw`shadow-2xl` : tw`shadow-none`,
                  tw`relative h-full`
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
              open && sm ? tw`opacity-50 pointer-events-auto` : tw`opacity-0`,
              tw`bg-black absolute z-10 transition-[opacity] pointer-events-none top-0 left-0 w-full h-full`
            ]}
            onClick={() => setOpen(false)}
          />

          <div css={[tw`w-full z-0`, sm && tw`-ml-[40px]`]}>
            {/* 544 = 600 - 54 (sidebar -translate-x) */}
            <div
              css={[
                tw`min-h-screen max-w-[800px] m-auto `
                // todo (animation): translate-x-[24px] then translate-x-0
              ]}
            >
              <div css={[sm && tw`m-auto max-w-[540px]`]}>{children}</div>
            </div>
          </div>
        </div>
      </Back>
    </context.Provider>
  )
}

export const Default_Expand = ({ disabled }: { disabled: boolean }) => {
  return (
    <span
      css={[
        tw`overflow-hidden absolute bottom-[20px] right-0 translate-x-[8px] w-[16px] h-[16px]`
      ]}
    >
      <span
        css={[
          tw`transition-[translate] duration-300 transform`,
          tw`bg-slate-500 cursor-pointer rounded-full border-black`,
          tw`w-full h-full block`,
          disabled && tw`translate-y-[36px]`
        ]}
      ></span>
    </span>
  )
}

const Defaults_Back = ({ children }: PropsWithChildren<object>) => (
  <>{children}</>
)

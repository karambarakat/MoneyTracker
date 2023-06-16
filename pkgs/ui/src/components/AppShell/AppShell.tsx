import 'twin.macro'

import { useId } from '@mantine/hooks'
import tw, { css, styled } from 'twin.macro'
import useHoverInOut from '../../hooks/useHoverInOut'
import { WithChildren } from '../../utils/WithChildren'
import { useCreateContext, context } from './context'
import type { AppShell_sideBar_Context } from './context'
import c from 'classnames'
import ScrollArea from '../ScrollArea'

interface Props {
  /**
   * the sidebar
   */
  SideBar: JSX.Element
  /**
   * Background for the main content
   */
  Back?: (p: WithChildren) => JSX.Element
  /**
   * UI toggle for the sidebar expansion
   */
  Expand?: ({ disabled }: { disabled: boolean }) => JSX.Element
  /**
   * size of unexpanded sidebar
   * @default 40px
   */
  sidebar_sm?: string
  /**
   * size of expanded or opened sidebar
   * @default 200px
   */
  sidebar_md?: string
  /**
   * breakpoint at which the sidebar is slidable
   */
  bp_sm: number
  /**
   * breakpoint at which the sidebar is expandable
   */
  bp_md: number
}

export default function AppShell({
  children,
  SideBar,
  Expand = Default_Expand,
  Back = Defaults_Back,
  sidebar_sm = '40px',
  sidebar_md = '200px',
  ...contextProp
}: WithChildren<Props>) {
  const useContext = useCreateContext(contextProp)
  const {
    expand,
    open,
    setOpen,
    toggleExpand,
    md,
    sm,
    disabled_query,
    md_query,
    sm_query,
  } = useContext
  const [_, ref] = useHoverInOut(500, s => {
    s === 'in' ? setOpen(true) : s === 'out' && setOpen(false)
  })
  const id = useId()

  const props = {
    disabled_query,
    md_query,
    sm_query,
    sidebar_md,
    sidebar_sm,
    ...contextProp,
  }

  return (
    <context.Provider value={useContext}>
      <Back>
        <div
          id={id}
          tw="flex min-h-screen"
          className={c(
            open ? 'open' : 'not-open', //
            `expand-${expand}`,
          )}
        >
          <SideBar_Shifter ref={ref} {...props}>
            <SideBar_sizer {...props}>
              <SideBar_content {...props}>
                <ScrollArea tw="h-screen">{SideBar}</ScrollArea>
                <span onClick={() => !sm && toggleExpand()}>
                  <Expand disabled={expand === 'disabled'} />
                </span>
              </SideBar_content>
            </SideBar_sizer>
          </SideBar_Shifter>

          <Curtain onClick={() => setOpen(false)} {...props} />

          <main
            css={css`
              ${tw`w-full z-0`}
              @media ${sm_query} {
                margin-left: -${sidebar_sm};
              }
              .open & {
                ${tw`overflow-hidden h-screen`}
              }
              .open.width-lg & {
                ${tw`overflow-auto h-auto`}
              }
            `}
          >
            <div css={[tw`min-h-screen max-w-[800px] m-auto`]}>
              <div
                css={css`
                  @media ${sm_query} {
                    margin: auto;
                    max-width: calc(${contextProp.bp_sm}px - ${sidebar_sm});
                  }
                `}
              >
                {children}
              </div>
            </div>
          </main>
        </div>
      </Back>
    </context.Provider>
  )
}

type StyleProps = Pick<Props, 'bp_md' | 'bp_sm' | 'sidebar_md' | 'sidebar_sm'> &
  Pick<AppShell_sideBar_Context, 'md_query' | 'sm_query' | 'disabled_query'>

const SideBar_Shifter = styled.div<StyleProps>`
  ${tw`z-30 transition-transform duration-300 flex-[0_0_0]`}
  @media ${p => p.sm_query} {
    transform: translateX(-${p => p.sidebar_sm}) !important;
  }
  .open & {
    transform: translateX(0) !important;
  }
`

const SideBar_sizer = styled.div<StyleProps>`
  ${tw`transition-[min-width,width] duration-300 h-full`}
  min-width: ${p => p.sidebar_sm};
  width: ${p => p.sidebar_md};

  @media ${p => p.sm_query} {
    width: ${p => p.sidebar_sm} !important;
  }

  @media ${p => p.sm_query} {
    /* width: ${p => p.sidebar_md} !important; */
    width: ${p => p.sidebar_sm};
  }

  .expand-0 & {
    width: ${p => p.sidebar_sm} !important;
  }
`

const SideBar_content = styled.div<StyleProps>`
  ${tw`shadow-none sticky top-0 w-full h-full max-h-screen transition-[box-shadow,width] duration-300 `}

  .open & {
    width: ${p => p.sidebar_md} !important;
    @media ${p => p.md_query} {
      ${tw`shadow-2xl`}
    }
  }
`

const Curtain = styled.div<StyleProps>`
  ${tw`pointer-events-none fixed z-10 transition-[opacity] top-0 left-0 w-full h-full`}
  .open & {
    @media ${p => p.md_query} {
      ${tw`bg-black/50 opacity-50 pointer-events-auto`}
    }
  }
  .not-open & {
    @media ${p => p.md_query} {
      ${tw`opacity-0`}
    }
  }
`

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

const Defaults_Back = ({ children }: WithChildren) => <>{children}</>

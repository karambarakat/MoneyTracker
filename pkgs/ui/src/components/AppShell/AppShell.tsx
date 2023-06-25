import 'twin.macro'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useId, useMediaQuery } from '@mantine/hooks'
import tw, { TwStyle, css, styled } from 'twin.macro'
import useHoverInOut from '../../hooks/useHoverInOut'
import { WithAsChild, WithChildren } from '../../utils/WithChildren'
// import { useCreateContext, context } from './context'
import type { AppShell_sideBar_Context } from './context'
import c from 'classnames'
import ScrollArea from '../ScrollArea'
import { Slot } from '@radix-ui/react-slot'
import { SerializedStyles } from '@emotion/react'

export interface Props {
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

interface MediaQueries {
  /**
   * css @media selector at which the sidebar is expandable
   */
  md_query: string
  /**
   * css @media selector at which the sidebar is slidable
   */
  sm_query: string
  /**
   * css @media selector at which the sidebar is not allowed to either expand or contract
   */
  disabled_query: string
}

interface ContextQueries {
  /**
   * result of `window.matchQuery` api,  at which the sidebar is expandable
   */
  md: boolean
  /**
   * result of `window.matchQuery` api,  at which the sidebar is slidable
   */
  sm: boolean
  /**
   * result of `window.matchQuery` api,  at which the sidebar is not allowed to either expand or contract
   */
  disabled: boolean
  /**
   * calculated based on `md` and `sm`
   */
  width: 'sm' | 'md' | 'lg'
}

const getMediaQueries = (props: Props) => {
  const md_query = `(max-width: ${props.bp_md}px)`
  const sm_query = `(max-width: ${props.bp_sm}px)`
  const disabled_query = `(min-width: ${props.bp_md}px), (max-width: ${props.bp_sm}px)`

  return {
    md_query,
    sm_query,
    disabled_query,
  } as MediaQueries
}

const useQueries = (props: MediaQueries) => {
  const md = useMediaQuery(props.md_query)
  const sm = useMediaQuery(props.sm_query)
  const disabled = useMediaQuery(props.disabled_query)

  const width = md && sm ? 'sm' : md && !sm ? 'md' : 'lg'

  return {
    md,
    sm,
    disabled,
    width,
  } as ContextQueries
}

interface ComponentState {
  /**
   * wether the sidebar is overlaying on the content
   */
  open: boolean
  /**
   * control the state of the sidebar
   */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  /**
   * wether the sidebar is expanded beside the content
   */
  expand: 'disabled' | 0 | 1
  /**
   * toggle the state of the sidebar's expansion, if applicable
   */
  toggleExpand: () => void
}

const useComponentState = (query: ReturnType<typeof useQueries>) => {
  const [expand, setExpand] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    // when going to sm screen, hide the sidebar
    if (query.width === 'sm') setExpand(false)
    setOpen(false)
  }, [query.md, query.sm])

  useEffect(() => {
    // always open on large
    if (query.width === 'lg') setOpen(true)
  }, [query.sm, query.md, open])

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
    open,
    setOpen,
    expand: query.disabled ? 'disabled' : expand ? 1 : 0,

    toggleExpand: () => {
      if (query.disabled) return
      setExpand(s => !s)
    },
  } as ComponentState
}

export interface AppShellContext {
  id: string
  state: ComponentState
  query: ContextQueries
  media: MediaQueries
  props: Props
}

const context = createContext<AppShellContext>({
  id: '',
  state: {
    expand: 0,
    open: false,
    setOpen: () => console.error('no context'),
    toggleExpand: () => console.error('no context'),
  },
  query: {
    sm: false,
    md: false,
    disabled: false,
    width: 'lg',
  },
  media: {
    md_query: `(max-width: ${767}px)`,
    sm_query: `(max-width: ${639}px)`,
    disabled_query: `(min-width: ${767}px), (max-width: ${639}px)`,
  },
  props: {
    bp_md: 767,
    bp_sm: 639,
    sidebar_md: '250px',
    sidebar_sm: '64px',
  },
})

export const useAppShellContext = () => useContext(context)

export function Root({ children, asChild, ...props }: WithAsChild<Props>) {
  const Component = asChild ? Slot : 'div'
  const media = getMediaQueries(props)
  const query = useQueries(media)
  const state = useComponentState(query)
  const id = useId() + '-app-shell'

  return (
    <context.Provider value={{ id, state, query, props, media }}>
      <Component
        {...props}
        id={id}
        tw="flex min-h-screen"
        className={c(
          state.open ? 'open' : 'not-open', //
          `expand-${state.expand}`,
        )}
      >
        {children}
      </Component>
    </context.Provider>
  )
}

type ExpandStyle = {
  base?: SerializedStyles | TwStyle
  expand_0?: SerializedStyles | TwStyle
  expand_1?: SerializedStyles | TwStyle
  expand_disabled?: SerializedStyles | TwStyle
}

export const Expand = ({
  children,
  asChild,
  styles,
}: WithAsChild<{ styles?: ExpandStyle }>) => {
  const Component = asChild ? Slot : 'span'
  const context = useAppShellContext()

  return (
    <Component
      onClick={() => !context.query.sm && context.state.toggleExpand()}
      css={[
        css`
          .expand-0 & {
            ${styles?.expand_0 || ''}
          }
          .expand-1 & {
            ${styles?.expand_1 || ''}
          }
          .expand-disabled & {
            ${styles?.expand_disabled || ''}
          }
        `,
        styles?.base || '',
      ]}
    />
  )
}

type OverlayStyle = {
  base?: SerializedStyles | TwStyle
  open?: SerializedStyles | TwStyle
  not_open?: SerializedStyles | TwStyle
}

export function Overlay({
  children,
  asChild,
  styles,
}: WithAsChild<{ styles?: OverlayStyle }>) {
  const Component = asChild ? Slot : 'div'
  const context = useAppShellContext()

  return (
    <Component
      onClick={() => context.state.setOpen(false)}
      css={css`
        ${tw`pointer-events-none fixed z-10 top-0 left-0 w-full h-full`}
        ${styles?.base || ''}
        .open & {
          @media ${context.media.md_query} {
            ${tw`pointer-events-auto`}
            ${styles?.open || ''}
          }
        }
        .not-open & {
          @media ${context.media.md_query} {
            ${styles?.not_open || ''}
          }
        }
      `}
    >
      {children}
    </Component>
  )
}

export function Content({ children, asChild }: WithAsChild) {
  // todo
  const Component = asChild ? Slot : 'main'
  const context = useAppShellContext()
  return (
    <Component
      css={css`
        ${tw`w-full z-0`}
        @media ${context.media.sm_query} {
          margin-left: -${context.props.sidebar_sm};
        }
      `}
    >
      {children}
    </Component>
  )
}

export function SideBar({ children }: WithChildren) {
  const { props, state, media } = useAppShellContext()

  const [_, ref] = useHoverInOut(500, s => {
    s === 'in' ? state.setOpen(true) : s === 'out' && state.setOpen(false)
  })

  return (
    <SideBar_Shifter ref={ref} {...media} {...props}>
      <SideBar_sizer {...media} {...props}>
        <SideBar_content {...media} {...props}>
          {children}
        </SideBar_content>
      </SideBar_sizer>
    </SideBar_Shifter>
  )
}

type StyleProps = Props & MediaQueries

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
  ${tw`shadow-none sticky top-0 w-full h-full max-h-screen transition-[box-shadow,width] duration-300`}

  .open & {
    width: ${p => p.sidebar_md} !important;
    @media ${p => p.md_query} {
      ${tw`shadow-2xl`}
    }
  }
`

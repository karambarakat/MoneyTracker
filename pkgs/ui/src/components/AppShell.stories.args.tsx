import tw, { css } from 'twin.macro'
import { useAppShellContext } from './AppShell'
import { fakerEN } from '@faker-js/faker'
import media from '../utils/mediaCss'
import { PropsWithChildren } from 'react'
import { Empty } from '../utils/Empty'

const helpers = {
  SideBarAvailable: ({ children }: { children: React.ReactNode }) => {
    const { sm_query } = useAppShellContext()
    return (
      <div
        css={[
          tw`transition-opacity opacity-0`,
          media(sm_query, tw`opacity-100`),
        ]}
      >
        {children}
      </div>
    )
  },
  ToggleSidebar: ({ children }: { children: React.ReactNode }) => {
    const { setOpen, sm_query } = useAppShellContext()
    return (
      <button
        css={[
          tw`cursor-not-allowed pointer-events-none`,
          media(sm_query, tw`cursor-pointer pointer-events-auto`),
        ]}
        onClick={() => setOpen(s => !s)}
      >
        {children}
      </button>
    )
  },

  SideBarItem: ({
    slot1,
    children,
  }: {
    children: React.ReactNode
    slot1?: React.ReactNode
  }) => {
    return (
      <div tw="h-[40px] flex">
        <div tw="flex-[0_0_40px] grid place-items-center">{children}</div>
        <div tw="grid content-center pr-4">
          <span tw="overflow-hidden text-ellipsis whitespace-nowrap">
            {slot1 || ''}
          </span>
        </div>
      </div>
    )
  },
}

export const Children = (
  <div tw="flex gap-2 flex-col p-3">
    <div tw="self-end">
      <helpers.ToggleSidebar>
        <helpers.SideBarAvailable>toggle sidebar</helpers.SideBarAvailable>
      </helpers.ToggleSidebar>
    </div>
    {(fakerEN.seed(2), fakerEN.lorem.lines(5).split('\n')).map((_, i) => (
      <div tw="dark:bg-slate-700 bg-slate-200 rounded px-5" key={i}>
        {_}
      </div>
    ))}
  </div>
)

export const Children_long = (
  <div tw="flex gap-2 flex-col p-3">
    <div tw="self-end">
      <helpers.ToggleSidebar>
        <helpers.SideBarAvailable>toggle sidebar</helpers.SideBarAvailable>
      </helpers.ToggleSidebar>
    </div>
    {(fakerEN.seed(2), fakerEN.lorem.lines(50).split('\n')).map((_, i) => (
      <div tw="dark:bg-slate-700 bg-slate-200 rounded px-5" key={i}>
        {_}
      </div>
    ))}
  </div>
)

export const SideBar_long = (
  <div tw="dark:bg-slate-700 bg-slate-200 flex flex-col gap-3 h-full">
    {(fakerEN.seed(2), fakerEN.lorem.lines(50).split('\n')).map((_, i) => {
      return (
        <helpers.SideBarItem key={i} slot1={_}>
          {i}
        </helpers.SideBarItem>
      )
    })}
    <div tw="flex-1"></div>
    <helpers.SideBarItem slot1="more content">···</helpers.SideBarItem>
  </div>
)

export const SideBar = (
  <div tw="dark:bg-slate-700 bg-slate-200 flex flex-col gap-3 h-full">
    {(fakerEN.seed(2), fakerEN.lorem.lines(5).split('\n')).map((_, i) => {
      return (
        <helpers.SideBarItem key={i} slot1={_}>
          {i}
        </helpers.SideBarItem>
      )
    })}
    <div tw="flex-1"></div>
    <helpers.SideBarItem slot1="more content">···</helpers.SideBarItem>
  </div>
)

export const Back_normal = ({ children }: PropsWithChildren<Empty>) => {
  return <div tw="bg-slate-50 dark:bg-slate-950">{children}</div>
}

export const Back_debug = ({ children }: PropsWithChildren<Empty>) => {
  const Debug = () => {
    const {
      setOpen,
      width,
      expand,
      open,
      sm,
      md,
      toggleExpand,
      sm_query,
      md_query,
    } = useAppShellContext()
    return (
      <pre tw="fixed bg-slate-300/50 dark:bg-slate-600/50 z-50 right-0 bottom-0 p-2 m-2 border-2">
        <em tw="text-gray-400">
          debug: <br />
        </em>
        width: {width} (
        <div tw="text-gray-300 dark:text-gray-600">
          <span css={media(sm_query, tw`text-gray-700 dark:text-gray-100`)}>
            1st_bp
          </span>{' '}
          <span css={media(md_query, tw`text-gray-700 dark:text-gray-100`)}>
            2nd_bp
          </span>
          )
        </div>
        <br />
        <button
          id="toggleExpand"
          css={[
            tw`bg-teal-800 text-white px-1 m-1`,
            expand === 'disabled' && tw`bg-gray-300/20 opacity-20`,
          ]}
          onClick={() => toggleExpand()}
          disabled={expand === 'disabled'}
        >
          expand: {expand}
        </button>
        <br />
        <button
          id="toggleSidebar"
          tw="bg-teal-800 text-white px-1 m-1"
          onClick={() => setOpen(s => !s)}
        >
          sidebar: {open ? 'opened' : 'closed'}
        </button>
      </pre>
    )
  }
  return (
    <div tw="bg-slate-50 dark:bg-slate-950">
      {children}
      <Debug />
    </div>
  )
}

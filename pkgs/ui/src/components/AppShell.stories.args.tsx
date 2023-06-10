import tw from 'twin.macro'
import { useAppShellContext } from './AppShell'
import { fakerEN } from '@faker-js/faker'

const helpers = {
  SideBarAvailable: ({ children }: { children: React.ReactNode }) => {
    const { sm } = useAppShellContext()
    return <div css={[tw`transition`, !sm && tw`opacity-0`]}>{children}</div>
  },
  ToggleSidebar: ({ children }: { children: React.ReactNode }) => {
    const { setOpen, sm } = useAppShellContext()
    return (
      <button
        css={[!sm && tw`cursor-not-allowed`]}
        onClick={() => setOpen(s => !s)}
      >
        {children}
      </button>
    )
  },

  SideBarItem: ({
    slot1,
    children
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
  }
}

export const Children = (
  <div tw="flex gap-2 flex-col p-3">
    <div tw="self-end">
      <helpers.ToggleSidebar>
        <helpers.SideBarAvailable>toggle sidebar</helpers.SideBarAvailable>
      </helpers.ToggleSidebar>
    </div>
    {(fakerEN.seed(2), fakerEN.lorem.lines(5).split('\n')).map((_, i) => (
      <div tw="bg-slate-200 rounded px-5" key={i}>
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
      <div tw="bg-slate-200 rounded px-5" key={i}>
        {_}
      </div>
    ))}
  </div>
)

export const SideBar = (
  <div tw="bg-slate-200 flex flex-col gap-3 h-full">
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

export const Back_normal = ({ children }: any) => {
  return <div tw="bg-slate-50">{children}</div>
}

export const Back_debug = ({ children }: any) => {
  const Debug = () => {
    const { setOpen, width, expand, open, sm, md } = useAppShellContext()
    return (
      <pre tw="fixed bg-slate-300/50 z-50 right-0 bottom-0 p-2 m-2 border-2">
        <em tw="text-gray-400">
          debug: <br />
        </em>
        width: {width} (<span css={!sm && tw`text-gray-300`}>1st_bp</span>{' '}
        <span css={!md && tw`text-gray-300`}>2nd_bp</span>)
        <br />
        expand: {expand} <br />
        <button
          tw="bg-teal-800 text-white px-1"
          onClick={() => setOpen(s => !s)}
        >
          sidebar: {open ? 'opened' : 'closed'}
        </button>
      </pre>
    )
  }
  return (
    <div tw="bg-slate-50">
      {children}
      <Debug />
    </div>
  )
}

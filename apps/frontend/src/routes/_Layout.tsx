import tw from 'twin.macro'
import React from 'react'

import LogoPng from '../public/logo.png'

import {
  ChevronLeft,
  Menu2,
  InfoCircle,
  LayoutGrid,
  Settings,
  Star,
  TableExport,
  Login,
  List,
} from 'tabler-icons-react'

import { Outlet, Link } from 'react-router-dom'

import * as AppShell from 'ui/src/components/AppShell/AppShell'
import TextEllipsis from 'ui/src/components/TextEllipsis'
import ToggleColorTheme from 'ui/src/colorMode/ToggleColorTheme'
import { color } from 'ui/src/utils/tw-helper'
import Text from 'ui/src/components/Text'
import Divider from 'ui/src/components/Divider'
import ButtonIcon from 'ui/src/components/ButtonIcon'
import Transition from 'ui/src/components/Transition'
import Button from 'ui/src/components/Button'
import { fade_from_bottom } from 'ui/src/components/Transition/transitions'
import FlexBox from 'ui/src/components/Transition/FlexSize'
import UserIcon from '../components/UserIcon'
import { Logout } from 'tabler-icons-react'
import { getTitle } from './_MetaContext'
import { ILink } from '../lib/react-router-dom'
import { profile, token } from '../utils/localStorage'
import ScrollArea from 'ui/src/components/ScrollArea'

export default function Main_Layout_Component() {
  return (
    <AppShell.Root bp_sm={639} bp_md={767} sidebar_sm="64px" sidebar_md="250px">
      <AppShell.SideBar>
        <div tw="bg-slate-100 dark:bg-slate-800 h-full">
          <Navbar />
          <AppShell.Expand asChild>
            <Expand />
          </AppShell.Expand>
        </div>
      </AppShell.SideBar>
      <AppShell.Overlay />
      <AppShell.Content asChild>
        <main
          css={{
            '*, &': {
              '--home-padding': '12px',
            },
            '#page': {
              marginLeft: 'var(--home-padding)',
            },
          }}
        >
          <ScrollArea asChild tw="px-4 max-w-[700px] m-auto relative">
            <div tw="flex flex-col min-h-screen">
              <Header
                tw="py-4"
                css={{
                  marginLeft: 'var(--home-padding)',
                }}
              />
              <Outlet />
            </div>
          </ScrollArea>
        </main>
      </AppShell.Content>
    </AppShell.Root>
  )
}

function Expand() {
  const {
    state: { expand, open, toggleExpand },
    query: { sm },
  } = AppShell.useAppShellContext()

  return (
    <div
      onClick={() => {
        // todo: remove when figure out why AppShell itself if not firing this
        // pkgs/ui/src/components/AppShell/AppShell.tsx:234
        !sm && toggleExpand()
      }}
      tw="absolute cursor-pointer rounded-full right-0 translate-x-[8px] bottom-[42px]"
    >
      <div
        css={[
          tw`opacity-100 transition-opacity`,
          expand === 'disabled' && tw`opacity-0`,
        ]}
        tw="rounded-full bg-slate-200 dark:bg-slate-800/80 p-[2px] w-[fit-content] h-[fit-content]"
      >
        <ChevronLeft
          size={14}
          css={[
            tw`transition-transform rotate-180`,
            (expand === 1 || open) && tw`rotate-0`,
          ]}
        />
      </div>
    </div>
  )
}

function Navbar() {
  const {
    state: { expand, open },
  } = AppShell.useAppShellContext()

  return (
    <div tw="flex flex-col gap-2 p-2 h-full max-h-full overflow-hidden">
      <div tw="flex w-[234px] overflow-hidden justify-between items-center gap-3 p-3 pb-2">
        <Link to={'/'}>
          <div
            css={[
              tw`transition-[width,height] duration-300`,
              expand === 1 || open
                ? tw`w-[40px] h-[40px]`
                : tw`w-[24px] h-[40px]`,
            ]}
          >
            <img src={LogoPng} />
          </div>
        </Link>
        <ToggleColorTheme label="toggle color scheme" />
      </div>
      <Divider />
      <Link to={'/'}>
        <Navbar_item icon={<List />} color={'green'} label={'Entries'} />
      </Link>
      <Link to={'/categories'}>
        <Navbar_item
          icon={<LayoutGrid />}
          color={'orange'}
          label={'Categories'}
        />
      </Link>
      {/* {[
        {
          icon: <LayoutGrid />,
          color: 'teal' as const,
          label: 'Categories',
          link: '/categories',
        },
        // {
        //   icon: <TableExport />,
        //   color: 'sky' as const,
        //   label: 'Export',
        //   link: '/export',
        //   asModal: true,
        // },
        // {
        //   icon: <Settings />,
        //   color: 'red' as const,
        //   label: 'Setting',
        //   link: '/setting',
        //   asModal: true,
        // },
        // {
        //   icon: <Star />,
        //   color: 'yellow' as const,
        //   label: 'Rate Us',
        //   link: '/rate-us',
        //   asModal: true,
        // },
        // {
        //   icon: <InfoCircle />,
        //   color: 'blue' as const,
        //   label: 'About',
        //   link: '/about',
        //   asModal: true,
        // },
      ]} */}

      <span tw="flex-1" />
      <Divider />
      <UserController_NavbarItem />
    </div>
  )
}

function UserController_NavbarItem() {
  const profile_ = profile.use()
  const token_ = token.use()

  return (
    <div>
      {profile_._item ? (
        <>
          <ILink to={'/profile'}>
            <Navbar_item
              icon={<UserIcon />}
              color={'indigo'}
              label={'profile'}
            />
          </ILink>
          <div
            onClick={() => {
              profile_.setItem(undefined)
              token_.setItem(undefined)
            }}
          >
            <Navbar_item icon={<Logout />} color={'indigo'} label={'log out'} />
          </div>
        </>
      ) : (
        <div
          onClick={() => {
            profile_.setItem(undefined)
            token_.setItem(undefined)
          }}
        >
          <Navbar_item icon={<Login />} color={'indigo'} label={'log out'} />
        </div>
      )}
    </div>
  )
}

function Header(p: object) {
  const {
    query: { width },
    state: { setOpen },
  } = AppShell.useAppShellContext()

  const title = getTitle()

  return (
    <div tw="flex justify-between items-center" {...p}>
      <Text size="h1">{title}</Text>
      <FlexBox no_y>
        <div tw="flex gap-2 overflow-hidden">
          <Transition
            keepMounted={false}
            mounted={width !== 'lg'}
            transition={fade_from_bottom}
          >
            {styles => (
              <ToggleColorTheme
                label="toggle color scheme"
                css={styles}
                variant="subtle"
              />
            )}
          </Transition>
          <Transition
            keepMounted={false}
            mounted={width === 'sm'}
            transition={fade_from_bottom}
          >
            {styles => (
              <ButtonIcon
                css={styles}
                color="slate"
                variant="subtle"
                asChild
                label="open menu"
              >
                <button onClick={() => setOpen(o => !o)}>
                  <Menu2 />
                </button>
              </ButtonIcon>
            )}
          </Transition>
        </div>
      </FlexBox>
    </div>
  )
}

function Navbar_item({
  icon,
  color,
  label,
}: {
  icon: JSX.Element
  color: color
  label: string
}) {
  const {
    state: { expand, open },
  } = AppShell.useAppShellContext()

  return (
    <Button
      tw="w-full flex items-center justify-stretch gap-5"
      variant="colored"
      color={color}
    >
      <span tw="w-[24px] h-[24px]">{icon}</span>
      <Text
        size="md"
        // @ts-ignore
        css={[
          tw`flex-1 overflow-hidden opacity-0 translate-y-2 transition-[opacity,transform]`,
          expand === 1 || expand === 'disabled' || open
            ? tw`opacity-100 translate-y-0 delay-100 -skew-y-0`
            : tw`-skew-y-3`,
        ]}
      >
        <TextEllipsis tw="text-left">{label}</TextEllipsis>
      </Text>
    </Button>
  )
}

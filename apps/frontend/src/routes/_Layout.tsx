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
import FlexBox from 'ui/src/components/experimental/FlexBox'
import UserIcon from '../components/UserIcon'
import { Logout } from 'tabler-icons-react'
import { getTitle } from './_MetaContext'
import { getProfile, setProfile, useProfile } from '../utils/localProfile'
import { ILink } from '../lib/react-router-dom'

export default function Main_Layout_Component() {
  return (
    <AppShell.Root bp_sm={639} bp_md={767} sidebar_sm="64px" sidebar_md="250px">
      <AppShell.SideBar>
        <div tw="bg-slate-100 dark:bg-slate-900 h-full">
          <Navbar />
          <AppShell.Expand asChild>
            <Expand />
          </AppShell.Expand>
        </div>
      </AppShell.SideBar>
      <AppShell.Overlay />
      <AppShell.Content>
        <div tw="border-black/30 p-4 max-w-[700px] m-auto">
          <Header />
          <Outlet />
        </div>
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
  const profile = useProfile()

  return (
    <div>
      {profile ? (
        <>
          <ILink to={'/profile'}>
            <Navbar_item
              icon={<UserIcon />}
              color={'indigo'}
              label={'profile'}
            />
          </ILink>
          <div onClick={() => setProfile(undefined)}>
            <Navbar_item icon={<Logout />} color={'indigo'} label={'log out'} />
          </div>
        </>
      ) : (
        <div onClick={() => setProfile(undefined)}>
          <Navbar_item icon={<Login />} color={'indigo'} label={'log out'} />
        </div>
      )}
    </div>
  )
}

function Header() {
  const {
    query: { width },
    state: { setOpen },
  } = AppShell.useAppShellContext()

  const title = getTitle()

  return (
    <div tw="flex justify-between items-center">
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
      variant="subtle"
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

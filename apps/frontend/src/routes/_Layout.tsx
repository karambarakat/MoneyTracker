import React from 'react'
import Button from 'ui/src/components/Button'
import LogoPng from '@src/public/logo.png'

import Brand from '@src/components/Brand'
import {
  ChartPie2,
  ChevronLeft,
  Menu2,
  InfoCircle,
  LayoutGrid,
  MoonStars,
  PlugConnected,
  Settings,
  Star,
  Sun,
  TableExport,
} from 'tabler-icons-react'

import {
  AppShell as AppShel_deprecated,
  Box,
  Burger,
  Drawer,
  Group,
  MediaQuery,
  Navbar,
  ScrollArea,
  ThemeIcon,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'

// import { getTitle, Link } from '@src/components/ReactRoute/index'

import { UserController } from '@src/components/UserController'
import ToggleColorScheme from '@src/components/ToggleColorScheme'
import AppShell, { useAppShellContext } from 'ui/src/components/AppShell'
import tw from 'twin.macro'
import TextEllipsis from 'ui/src/components/TextEllipsis'
import ToggleColorTheme from 'ui/src/colorMode/ToggleColorTheme'
import { color } from 'ui/src/utils/tw-helper'
import Text from 'ui/src/components/Text'
import Divider from 'ui/src/components/Divider'
import ButtonIcon from 'ui/src/components/ButtonIcon'
import Transition from 'ui/src/components/Transition'

// export function Main_Layout_Component() {
export default function Main_Layout_Component() {
  return (
    <AppShell
      bp_1st={639}
      bp_2nd={767}
      size_sm="64px" // icon 16px + button padding 10px * 2 + navbar padding 8px * 2
      size_md="250px"
      SideBar={
        <div tw="h-full bg-slate-100 dark:bg-slate-900">
          <Navbar_New />
        </div>
      }
      Expand={Expand}
      Back={({ children }) => (
        <div tw="dark:bg-slate-800 bg-slate-50">{children}</div>
      )}
    >
      <div tw="border-black/30 border-2 p-4">
        <Header />
        <Outlet />
      </div>
    </AppShell>
  )
}

function Expand() {
  const { expand, open } = useAppShellContext()
  return (
    <div tw="absolute  cursor-pointer rounded-full right-0 translate-x-[8px] bottom-[42px] ">
      <div
        css={[
          tw`opacity-100 transition-opacity`,
          expand === 'disabled' && tw`opacity-0`,
        ]}
        tw="rounded-full bg-slate-200 dark:bg-slate-700 p-[2px] w-[fit-content] h-[fit-content]"
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

function Navbar_New() {
  const { open, expand } = useAppShellContext()

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
        <ToggleColorTheme />
      </div>
      <Divider />
      {[
        {
          icon: <LayoutGrid />,
          color: 'teal' as const,
          label: 'Categories',
          link: '/categories',
        },
        {
          icon: <TableExport />,
          color: 'sky' as const,
          label: 'Export',
          link: '/export',
          asModal: true,
        },
        {
          icon: <Settings />,
          color: 'red' as const,
          label: 'Setting',
          link: '/setting',
          asModal: true,
        },
        {
          icon: <Star />,
          color: 'yellow' as const,
          label: 'Rate Us',
          link: '/rate-us',
          asModal: true,
        },
        {
          icon: <InfoCircle />,
          color: 'blue' as const,
          label: 'About',
          link: '/about',
          asModal: true,
        },
      ].map(element => {
        return (
          <Link to={element.link} key={element.link}>
            <Navbar_item
              icon={element.icon}
              color={element.color}
              label={element.label}
            />
          </Link>
        )
      })}
      <span tw="flex-1" />
      <Divider />
      <Link to="/auth">
        <Navbar_item
          icon={<PlugConnected />}
          color={'indigo'}
          label={'Sign In or Log In to Sync'}
        />
      </Link>
    </div>
  )
}

function Header() {
  const { width, setOpen } = useAppShellContext()
  return (
    <div tw="flex justify-between items-center">
      <Text size="h1">Home</Text>
      <div tw="flex gap-2">
        {/* <Transition /> */}
        {width === 'sm' && (
          <Transition>
            <ButtonIcon variant="subtle" onClick={() => setOpen(s => !s)}>
              <Menu2 />
            </ButtonIcon>
          </Transition>
        )}
      </div>
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
  const { open, expand } = useAppShellContext()
  return (
    <Button
      tw="w-full flex items-center justify-stretch gap-5"
      variant="subtle"
      color={color}
    >
      <span>{icon}</span>
      <Text
        size="md"
        css={[
          tw`flex-1 overflow-hidden opacity-0 translate-y-2 transition-[opacity,transform]`,
          expand === 1 || open
            ? tw`opacity-100 translate-y-0 delay-100 -skew-y-0`
            : tw`-skew-y-3`,
        ]}
      >
        <TextEllipsis tw="text-left">{label}</TextEllipsis>
      </Text>
    </Button>
  )
}

export function Main_Layout_Component_Deprecated() {
  // export default function Main_Layout_Component_Deprecated() {
  const theme = useMantineTheme()

  return (
    <AppShel_deprecated
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={<Navbar_Custom opened={true} />}
    >
      {/* <MyContainer> */}
      <Outlet />
      {/* </MyContainer> */}
    </AppShel_deprecated>
  )
}

function Content_Header_Deprecated() {
  const [opened, setOpened] = useState(false)
  const title = '' //getTitle()
  return (
    <Group position="apart">
      <Text color={'theme-orange'}>
        <Title color={'theme-orange'} sx={{ margin: '0rem 0rem 1rem' }}>
          {title}
        </Title>
      </Text>
      <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
        <div>
          <Burger
            opened={opened}
            onClick={() => {
              setOpened(true)
            }}
          />
          <Drawer
            withCloseButton={false}
            opened={opened}
            onClose={() => {
              setOpened(false)
            }}
          >
            <Navbar_Custom opened={!opened} />
          </Drawer>
        </div>
      </MediaQuery>
    </Group>
  )
}

function Navbar_Custom({ opened }: { opened: boolean }) {
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={opened}
      width={{ sm: 300, md: 350, lg: 400 }}
    >
      <Navbar.Section my="xs">
        <BrandNavbar />
      </Navbar.Section>

      <Divider my={10} />

      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <ContentNavbar />
      </Navbar.Section>

      <Divider my={10} />

      <Navbar.Section>
        <UserController />
      </Navbar.Section>
    </Navbar>
  )
}

function BrandNavbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Box
      sx={theme => ({
        paddingLeft: theme.spacing.xs,
        paddingRight: theme.spacing.xs,
      })}
    >
      <Group position="apart">
        <Brand />
        <ToggleColorScheme />
      </Group>
    </Box>
  )
}

const data0 = [
  {
    icon: <ChartPie2 />,
    color: 'blue' as const,
    label: 'Charts',
    link: '/charts',
  },
]

const data = [
  {
    icon: <LayoutGrid />,
    color: 'teal' as const,
    label: 'Categories',
    link: '/categories',
  },
  {
    icon: <TableExport />,
    color: 'violet' as const,
    label: 'Export',
    link: '/export',
    asModal: true,
  },
  {
    icon: <Settings />,
    color: 'grape' as const,
    label: 'Setting',
    link: '/setting',
    asModal: true,
  },
  {
    icon: <Star />,
    color: 'yellow' as const,
    label: 'Rate Us',
    link: '/rate-us',
    asModal: true,
  },
  {
    icon: <InfoCircle />,
    color: 'blue' as const,
    label: 'About',
    link: '/about',
    asModal: true,
  },
]

function ContentNavbar() {
  return (
    <>
      {data0.map(element => {
        return (
          <Link key={element.link} to={element.link}>
            <MyButton>
              <Group>
                <ThemeIcon color={element.color} variant="light">
                  {element.icon}
                </ThemeIcon>
                <Text size="sm">{element.label}</Text>
              </Group>
            </MyButton>
          </Link>
        )
      })}
      <Divider my={10} />
      {data.map(element => {
        return (
          <Link
            key={element.link}
            to={element.link}
            as_modal={element.asModal || false}
          >
            <MyButton>
              <Group>
                <ThemeIcon color={element.color} variant="light">
                  {element.icon}
                </ThemeIcon>
                <Text size="sm">{element.label}</Text>
              </Group>
            </MyButton>
          </Link>
        )
      })}
    </>
  )
}

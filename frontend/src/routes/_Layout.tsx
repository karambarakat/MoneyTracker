import Brand from '@components/Brand'
import {
  ChartPie2,
  InfoCircle,
  LayoutGrid,
  MoonStars,
  Settings,
  Star,
  Sun,
  TableExport,
} from 'tabler-icons-react'

import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Divider,
  Drawer,
  Group,
  MediaQuery,
  Navbar,
  ScrollArea,
  Text,
  ThemeIcon,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import MyContainer from '@components/Mantine/Container'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import MyButton from '@components/Mantine/Button'

import { Link } from '@components/ReactRouter'
import { UserController } from '@components/UserController'
import ToggleColorScheme from '@components/ToggleColorScheme'

export default function Main_Layout_Component() {
  const theme = useMantineTheme()

  return (
    <AppShell
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
      <MyContainer>
        <Content_Header />
        <Outlet />
      </MyContainer>
    </AppShell>
  )
}

function Content_Header() {
  const [opened, setOpened] = useState(false)
  return (
    <Group position="apart">
      <Text color={'theme-orange'}>
        <Title color={'theme-orange'} sx={{ margin: '0rem 0rem 1rem' }}>
          Home
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
      sx={(theme) => ({
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
    icon: <ChartPie2 size={16} />,
    color: 'blue',
    label: 'Charts',
    link: '/charts',
  },
]

const data = [
  {
    icon: <LayoutGrid size={16} />,
    color: 'teal',
    label: 'Categories',
    link: '/categories',
  },
  {
    icon: <TableExport size={16} />,
    color: 'violet',
    label: 'Export',
    link: '/export',
    asModal: true,
  },
  {
    icon: <Settings size={16} />,
    color: 'grape',
    label: 'Setting',
    link: '/setting',
    asModal: true,
  },
  {
    icon: <Star size={16} />,
    color: 'yellow',
    label: 'Rate Us',
    link: '/rate-us',
    asModal: true,
  },
  {
    icon: <InfoCircle size={16} />,
    color: 'blue',
    label: 'About',
    link: '/about',
    asModal: true,
  },
]

function ContentNavbar() {
  return (
    <>
      {data0.map((element) => {
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
      {data.map((element) => {
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

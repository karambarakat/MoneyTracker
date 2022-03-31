import Brand from '@components/Brand'
import ToggleColorScheme from '@components/ToggleColorScheme'
import {
  ChartPie2,
  ChevronLeft,
  ChevronRight,
  InfoCircle,
  LayoutGrid,
  MoonStars,
  Settings,
  Star,
  Sun,
  TableExport,
  User,
} from 'tabler-icons-react'

import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Drawer,
  Group,
  Header,
  MediaQuery,
  Navbar,
  ScrollArea,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import MyContainer from '@components/Mantine/Container'
import { useMediaQuery } from '@mantine/hooks'
import { PropsWithChildren, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import MyButton from '@components/Mantine/Button'
import Separator from '@components/Seperator'

function Main_Layout_Component() {
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
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
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
    <Group position='apart'>
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
      p='md'
      hiddenBreakpoint='sm'
      hidden={opened}
      width={{ sm: 300, md: 350, lg: 400 }}
    >
      <Navbar.Section my='xs'>
        <BrandNavbar />
      </Navbar.Section>

      <Separator />

      <Navbar.Section grow component={ScrollArea} mx='-xs' px='xs'>
        <ContentNavbar />
      </Navbar.Section>

      <Separator />

      <Navbar.Section>
        <UserNavbar />
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
      <Group position='apart'>
        <Brand />
        <ActionIcon
          variant='outline'
          onClick={() => toggleColorScheme()}
          size={30}
          color={colorScheme === 'dark' ? 'yellow' : 'blue'}
        >
          {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
        </ActionIcon>
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
  },
  {
    icon: <Settings size={16} />,
    color: 'grape',
    label: 'Setting',
    link: '/setting',
  },
  {
    icon: <Star size={16} />,
    color: 'yellow',
    label: 'Rate Us',
    link: '/rate-us',
  },
  {
    icon: <InfoCircle size={16} />,
    color: 'blue',
    label: 'About',
    link: '/about',
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
                <ThemeIcon color={element.color} variant='light'>
                  {element.icon}
                </ThemeIcon>
                <Text size='sm'>{element.label}</Text>
              </Group>
            </MyButton>
          </Link>
        )
      })}
      <Separator />
      {data.map((element) => {
        return (
          <Link key={element.link} to={element.link}>
            <MyButton>
              <Group>
                <ThemeIcon color={element.color} variant='light'>
                  {element.icon}
                </ThemeIcon>
                <Text size='sm'>{element.label}</Text>
              </Group>
            </MyButton>
          </Link>
        )
      })}
    </>
  )
}

function UserNavbar() {
  const theme = useMantineTheme()

  return (
    <Box>
      <MyButton>
        <Group>
          {false ? (
            <Avatar
              src='https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80'
              radius='xl'
            />
          ) : (
            <Avatar radius={'xl'} color='primary'>
              <User />
            </Avatar>
          )}
          <Box sx={{ flex: 1 }}>
            <Text size='sm' weight={500}>
              Amy Horsefighter
            </Text>
            <Text color='dimmed' size='xs'>
              ahorsefighter@gmail.com
            </Text>
          </Box>

          {theme.dir === 'ltr' ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </Group>
      </MyButton>
    </Box>
  )
}

export default Main_Layout_Component

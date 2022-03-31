import Brand from '@components/Brand'
import ToggleColorScheme from '@components/ToggleColorScheme'
import {
  ChevronLeft,
  ChevronRight,
  MoonStars,
  Sun,
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
  Title,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import Container_C from '@components/Mantine/Container'
import { useMediaQuery } from '@mantine/hooks'
import { PropsWithChildren, useState } from 'react'
import { Outlet } from 'react-router-dom'

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
      <Container_C>
        <Content_Header />
        <Outlet />
      </Container_C>
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
      <Navbar.Section mt='xs'>
        <BrandNavbar />
      </Navbar.Section>

      <Navbar.Section grow component={ScrollArea} mx='-xs' px='xs'>
        {/* scrollable content here */}
      </Navbar.Section>

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
        paddingBottom: theme.spacing.lg,
        borderBottom: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
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

function UserNavbar() {
  const theme = useMantineTheme()

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.md,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Avatar
            src='https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80'
            radius='xl'
          />
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
      </UnstyledButton>
    </Box>
  )
}

export default Main_Layout_Component

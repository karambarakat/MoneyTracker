import { Avatar, Box, Group, Menu, Text, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { RootState, UserState } from '@src/redux/types'
import { useSelector } from 'react-redux'
import dispatch from '@src/redux/dispatch'
import {
  ChevronLeft,
  ChevronRight,
  Logout,
  PlugConnected,
  User
} from 'tabler-icons-react'
import MyButton from './Mantine/Button'
import { Link } from './ReactRoute'
import TextEllipsis from 'ui/src/components/TextEllipsis'
import OnlineStateAction from './OnlineStateAction'

export function UserController() {
  const theme = useMantineTheme()
  const [opened, handlers] = useDisclosure(false)
  const user = useSelector<RootState, UserState>(s => s.user)

  if (!user.profile) {
    return (
      <Link to={'/auth'} as_modal={true}>
        <MyButton>
          <Group sx={{ flexWrap: 'nowrap' }}>
            <Avatar radius={'xl'} color="indigo">
              <PlugConnected />
            </Avatar>
            <Text>Sign In or Log In to Sync</Text>
          </Group>
        </MyButton>
      </Link>
    )
  }

  // if (!user.offline)
  //   return (
  //     <>
  //       <Text>Error</Text>
  //       <div style={{ display: 'none' }}>
  //         invalid state, contact developer. maybe you should use
  //         invalidStateReducerEnhancer
  //       </div>
  //     </>
  //   )

  return (
    <Menu
      transition={'pop'}
      position="bottom-start"
      // styles={{  }}
      opened={opened}
      onClose={handlers.close}
    >
      <Menu.Target>
        <div onClick={handlers.toggle}>
          <MyButton>
            <Group sx={{ flexWrap: 'nowrap' }}>
              <Avatar src={user.profile.picture} radius="xl" />
              <Box
                sx={{
                  overflow: 'hidden',
                  flexGrow: 1,
                  flexShrink: 1
                }}
              >
                <Text size="sm" weight={500}>
                  <TextEllipsis>{user.profile.displayName}</TextEllipsis>
                </Text>
                <Text color="dimmed" size="xs">
                  <TextEllipsis>{user.profile.email}</TextEllipsis>
                </Text>
              </Box>
              <Box sx={{ display: 'flex' }}>
                {theme.dir === 'ltr' ? (
                  <ChevronRight size={18} />
                ) : (
                  <ChevronLeft size={18} />
                )}
              </Box>
            </Group>
          </MyButton>
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>User</Menu.Label>
        <Link to={'/profile'} as_modal>
          <Menu.Item icon={<User size={14} />}>Profile</Menu.Item>
        </Link>
        <OnlineStateAction>
          {text => {
            return <Menu.Item icon={<Logout size={14} />}>{text}</Menu.Item>
          }}
        </OnlineStateAction>

        <Menu.Item
          icon={<Logout size={14} />}
          onClick={() => {
            dispatch('user:logout', {})
          }}
        >
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

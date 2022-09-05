import {
  Avatar,
  Box,
  Group,
  Menu,
  Text,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { store } from '@redux/index'

import { MyDispatch, RootState, UserState } from '@redux/types'
import { useDispatch, useSelector } from 'react-redux'
import {
  ChevronLeft,
  ChevronRight,
  Login,
  Logout,
  PlugConnected,
  User,
} from 'tabler-icons-react'
import MyButton from './Mantine/Button'
import { Link } from './ReactRouter'

export function UserController() {
  const theme = useMantineTheme()
  const [opened, handlers] = useDisclosure(false)
  const user = useSelector<RootState, UserState>((s) => s.user)
  const dispatch = useDispatch()

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

  return (
    <Menu
      styles={{ root: { width: '100%' } }}
      control={
        <div onClick={handlers.toggle}>
          <MyButton>
            <Group sx={{ flexWrap: 'nowrap' }}>
              <Avatar src={user.profile.picture} radius="xl" />
              <Box sx={{ overflow: 'hidden', flexGrow: 1, flexShrink: 1 }}>
                <Text
                  sx={{
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                  size="sm"
                  weight={500}
                >
                  {user.profile.userName}
                </Text>
                <Text
                  sx={{
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                  color="dimmed"
                  size="xs"
                >
                  {user.profile.email}
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
      }
      opened={opened}
      onClose={handlers.close}
    >
      <Menu.Label>User</Menu.Label>
      <Link to={'/profile'} as_modal>
        <Menu.Item icon={<User size={14} />}>Profile</Menu.Item>
      </Link>
      <Menu.Item
        icon={<Logout size={14} />}
        onClick={() => {
          store.dispatch<MyDispatch>({ type: 'USER_LOGOUT' })
        }}
      >
        Log Out
      </Menu.Item>
    </Menu>
  )
}

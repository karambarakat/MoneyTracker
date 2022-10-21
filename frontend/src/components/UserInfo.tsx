import { Avatar, Box, Group, Menu, Text, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import user_logout from '@redux/hooks/user_logout'
import rootReducer, { RootState } from '@redux/reducers'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronLeft, ChevronRight, Logout, User } from 'tabler-icons-react'
import MyButton from './Mantine/Button'

function UserInfo() {
  const theme = useMantineTheme()
  const [opened, handlers] = useDisclosure(false)

  const user = useSelector((s: RootState) => s.user)
  const logout = user_logout()
  return (
    <Menu
      styles={{ root: { width: '100%' } }}
      opened={opened}
      control={
        <div onClick={handlers.toggle}>
          <MyButton>
            <Group noWrap>
              {false ? (
                <Avatar
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                  radius="xl"
                />
              ) : (
                <Avatar radius={'xl'} color="primary">
                  <User />
                </Avatar>
              )}
              <Box
                sx={{
                  flex: 1,
                  overflow: 'hidden',
                  '> *': {
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  },
                }}
              >
                <Text size="sm" weight={500}>
                  {user.profile?.userName}
                </Text>
                <Text color="dimmed" size="xs">
                  {user.profile?.email}
                </Text>
              </Box>

              <Box sx={{ flexShrink: 0 }}>
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
      onClose={handlers.close}
    >
      <Menu.Label>User</Menu.Label>
      <Menu.Item icon={<User size={14} />}>Profile</Menu.Item>
      <Menu.Item
        onClick={logout}
        color={'red'}
        icon={<Logout color="red" size={14} />}
      >
        Logout
      </Menu.Item>
    </Menu>
  )
}

export default UserInfo

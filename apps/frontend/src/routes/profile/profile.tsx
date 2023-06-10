import { Link, useRoutes } from '@src/components/ReactRoute/index'
import TextEllipsis from 'ui/src/components/TextEllipsis'

import {
  Box,
  Avatar,
  Group,
  Text,
  useMantineTheme,
  Button,
  Stack,
  Divider
} from '@mantine/core'
import { store } from '@src/redux/index'

import { ActionsObjects, RootState, UserState } from '@src/redux/types'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import dispatch from '@src/redux/dispatch'
import { ReactElement } from 'react'
import OnlineStateAction from '@src/components/OnlineStateAction'

function Profile() {
  const user = useSelector<RootState, UserState>(s => s.user)
  const theme = useMantineTheme()

  if (!user.profile) {
    return <Text>No User Found</Text>
  }
  return (
    <>
      <Group sx={{ flexWrap: 'nowrap', alignItems: 'start' }}>
        <Avatar size={'xl'} src={user.profile.picture} radius="sm" />
        <Box sx={{ overflow: 'hidden', flexGrow: 1, flexShrink: 1 }}>
          <Text size="xl" weight={500}>
            <TextEllipsis>{user.profile.displayName}</TextEllipsis>
          </Text>
          <Text color="dimmed" weight={200} size="lg">
            <TextEllipsis>{user.profile.email}</TextEllipsis>
          </Text>
        </Box>
      </Group>
      <Divider my={24} />
      <Outlet />
    </>
  )
}

export function ProfileIndex() {
  const user = useSelector<RootState, UserState>(s => s.user)
  const exit = useRoutes()

  return (
    <Stack>
      <Link to={'/profile/update'}>
        <Button style={{ width: '100%' }} size="md" variant="filled">
          Update the Profile
        </Button>
      </Link>
      {!user.profile?.providers.includes('local') && (
        <Link to={'/profile/setPassword'}>
          <Button style={{ width: '100%' }} size="md" variant="filled">
            Set Password
          </Button>
        </Link>
      )}
      {user.profile?.providers.includes('local') && (
        <Link to={'/profile/changePassword'}>
          <Button style={{ width: '100%' }} size="md" variant="filled">
            Change Password
          </Button>
        </Link>
      )}
      <OnlineStateAction>
        {text => {
          return (
            <Button
              style={{ width: '100%' }}
              size="md"
              variant="filled"
              onClick={() => {
                exit()
              }}
            >
              {text}
            </Button>
          )
        }}
      </OnlineStateAction>

      <Button
        style={{ width: '100%' }}
        size="md"
        variant="filled"
        color="red"
        onClick={() => {
          dispatch('user:logout', {})
          exit()
        }}
      >
        Log Out
      </Button>
    </Stack>
  )
}

export default Profile

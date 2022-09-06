import { Link, useRoutes } from '@components/ReactRouter'
import {
  Box,
  Avatar,
  Group,
  Text,
  useMantineTheme,
  Button,
  Stack,
  Divider,
} from '@mantine/core'
import { store } from '@redux/index'

import { MyDispatch, RootState, UserState } from '@redux/types'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

function Profile() {
  const user = useSelector<RootState, UserState>((s) => s.user)
  const theme = useMantineTheme()

  if (!user.profile) {
    return <Text>No User Found</Text>
  }
  return (
    <>
      <Group sx={{ flexWrap: 'nowrap', alignItems: 'start' }}>
        <Avatar size={'xl'} src={user.profile.picture} radius="sm" />
        <Box sx={{ overflow: 'hidden', flexGrow: 1, flexShrink: 1 }}>
          <Text
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            size="xl"
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
            weight={200}
            size="lg"
          >
            {user.profile.email}
          </Text>
        </Box>
      </Group>
      <Divider my={24} />
      <Outlet />
    </>
  )
}

export function ProfileIndex() {
  const user = useSelector<RootState, UserState>((s) => s.user)
  const { exit } = useRoutes()

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

      <Button
        style={{ width: '100%' }}
        size="md"
        variant="filled"
        color="red"
        onClick={() => {
          store.dispatch<MyDispatch>({ type: 'USER_LOGOUT' })
          exit()
        }}
      >
        Log Out
      </Button>
    </Stack>
  )
}

export default Profile

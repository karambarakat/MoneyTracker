import { Link, useRoutes } from '@components/ReactRouter'
import Separator from '@components/Seperator'
import {
  Box,
  Avatar,
  Group,
  Text,
  useMantineTheme,
  Button,
  Stack,
} from '@mantine/core'
import { store } from '@redux/index'
import { USER_LOGOUT } from '@redux/actions/user'
import { RootState, UserActionTypes, UserState } from '@redux/types'
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
      <Separator />
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
        <Button sx={{ width: '100%' }}>Update the Profile</Button>
      </Link>
      {!user.profile?.providers.includes('local') && (
        <Link to={'/profile/setPassword'}>
          <Button sx={{ width: '100%' }}>Set Password</Button>
        </Link>
      )}
      {user.profile?.providers.includes('local') && (
        <Link to={'/profile/changePassword'}>
          <Button sx={{ width: '100%' }}>Change Password</Button>
        </Link>
      )}

      <Button
        sx={{ width: '100%' }}
        color="red"
        onClick={() => {
          store.dispatch<UserActionTypes>({ type: USER_LOGOUT })
          exit()
        }}
      >
        Log Out
      </Button>
    </Stack>
  )
}

export default Profile

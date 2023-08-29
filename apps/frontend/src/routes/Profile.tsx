import React, { useState } from 'react'
import tw from 'twin.macro'
import { setTitle } from './_MetaContext'
import Button from 'ui/src/components/Button'
import ResetPassword from '../components/forms/ResetPassword'
import SetPassword from '../components/forms/SetPassword'
import UpdateProfile from '../components/forms/UpdateProfile'
import { useQuery } from '@tanstack/react-query'
import { queries, queryKeys } from '../api'
function Profile_Page_Component() {
  setTitle('Profile')

  const { data } = useQuery({
    queryFn: () => queries.profile(),
    queryKey: ['profile'] satisfies queryKeys,
  })

  if (!data) return <div>error</div>

  const [open, setOpen] = useState<'password' | 'profile' | ''>('')

  return (
    <div css={{ '&>*': tw`mt-4` }}>
      <h1>Profile</h1>
      <div>Name: {data.displayName}</div>
      <div>Email: {data.email}</div>
      <div>Picture: {data.picture || 'no picture'}</div>
      <div>
        Providers:
        {(['google', 'local'] as const)
          .map(
            e =>
              data.providers.includes(e) && (
                <div key={e}>
                  {' '}
                  <span>{e}</span>
                </div>
              ),
          )
          .filter(e => e)}
      </div>
      {data.providers.includes('local') ? (
        <div>
          <Button asChild>
            <button
              onClick={() => setOpen(o => (o === 'password' ? '' : 'password'))}
            >
              Reset Password
            </button>
          </Button>
          {open === 'password' && <ResetPassword />}
        </div>
      ) : (
        <div>
          <Button asChild>
            <button
              onClick={() => setOpen(o => (o === 'password' ? '' : 'password'))}
            >
              Set Password
            </button>
          </Button>
          {open === 'password' && <SetPassword />}
        </div>
      )}
      <div>
        <Button asChild>
          <button
            onClick={() => setOpen(o => (o === 'profile' ? '' : 'profile'))}
          >
            Update Profile
          </button>
        </Button>
        {open === 'profile' && <UpdateProfile />}
      </div>
    </div>
  )
}

export default Profile_Page_Component

// import { Link, useRoutes } from '../components/ReactRoute/index'
// import TextEllipsis from 'ui/src/components/TextEllipsis'

// import {
//   Box,
//   Avatar,
//   Group,
//   Text,
//   useMantineTheme,
//   Button,
//   Stack,
//   Divider,
// } from '@mantine/core'
// import { store } from '../redux/index'

// import { ActionsObjects, RootState, UserState } from '../redux/types'
// import { useSelector } from 'react-redux'
// import { Outlet } from 'react-router-dom'
// import dispatch from '../redux/dispatch'
// import { ReactElement } from 'react'
// import OnlineStateAction from '../components/OnlineStateAction'

// function Profile() {
//   const user = useSelector<RootState, UserState>(s => s.user)
//   const theme = useMantineTheme()

//   if (!user.profile) {
//     return <Text>No User Found</Text>
//   }
//   return (
//     <>
//       <Group sx={{ flexWrap: 'nowrap', alignItems: 'start' }}>
//         <Avatar size={'xl'} src={user.profile.picture} radius="sm" />
//         <Box sx={{ overflow: 'hidden', flexGrow: 1, flexShrink: 1 }}>
//           <Text size="xl" weight={500}>
//             <TextEllipsis>{user.profile.displayName}</TextEllipsis>
//           </Text>
//           <Text color="dimmed" weight={200} size="lg">
//             <TextEllipsis>{user.profile.email}</TextEllipsis>
//           </Text>
//         </Box>
//       </Group>
//       <Divider my={24} />
//       <Outlet />
//     </>
//   )
// }

// export function ProfileIndex() {
//   const user = useSelector<RootState, UserState>(s => s.user)
//   const exit = useRoutes()

//   return (
//     <Stack>
//       <Link to={'/profile/update'}>
//         <Button style={{ width: '100%' }} size="md" variant="filled">
//           Update the Profile
//         </Button>
//       </Link>
//       {!user.profile?.providers.includes('local') && (
//         <Link to={'/profile/setPassword'}>
//           <Button style={{ width: '100%' }} size="md" variant="filled">
//             Set Password
//           </Button>
//         </Link>
//       )}
//       {user.profile?.providers.includes('local') && (
//         <Link to={'/profile/changePassword'}>
//           <Button style={{ width: '100%' }} size="md" variant="filled">
//             Change Password
//           </Button>
//         </Link>
//       )}
//       <OnlineStateAction>
//         {text => {
//           return (
//             <Button
//               style={{ width: '100%' }}
//               size="md"
//               variant="filled"
//               onClick={() => {
//                 exit()
//               }}
//             >
//               {text}
//             </Button>
//           )
//         }}
//       </OnlineStateAction>

//       <Button
//         style={{ width: '100%' }}
//         size="md"
//         variant="filled"
//         color="red"
//         onClick={() => {
//           dispatch('user:logout', {})
//           exit()
//         }}
//       >
//         Log Out
//       </Button>
//     </Stack>
//   )
// }

// export default Profile

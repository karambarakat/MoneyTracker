import 'twin.macro'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Text from 'ui/src/components/Text'

export default function () {
  return (
    <div tw="grid place-content-center min-h-screen">
      <div tw="min-w-[400px]">
        <Text tw="text-center mb-10" size="h1">
          Auth
        </Text>
        <Outlet />
        <div tw="flex gap-3 mt-10 justify-center">
          <Link to={'/auth/login'}>login</Link>
          <span>|</span>
          <Link to={'/auth/signup'}>signup</Link>
        </div>
      </div>
    </div>
  )
}

// deprecated code

// const data = [
//   {
//     stage: './google',
//     color: 'blue',
//     icon: <BrandGoogle />,
//     title: 'Use Google',
//   },
//   {
//     stage: './email',
//     color: 'red',
//     icon: <Mail />,
//     title: 'Using Email',
//   },
//   {
//     stage: './local',
//     color: 'primaryColor',
//     icon: <WifiOff />,
//     title: 'Continue Offline',
//   },
// ]

// export default function () {
//   const [stage, setStage] = useState<'.' | './email'>('.')
//   const goBack = useGoBack()
//   setTitle(' ')

//   return (
//     <>
//       <NextStage nextStage={stage === './email'}>
//         <Box style={{ margin: '0 20px' }}>
//           <Title order={2} align="center" mb={28}>
//             Select Authorization Method.
//           </Title>
//           <Stack>
//             <Button
//               color="indigo"
//               variant="filled"
//               style={{ height: 48 }}
//               onClick={() => {
//                 ;(
//                   window as unknown as OpenerFunctions
//                 ).__$openerFunctionsContext = {
//                   callback: async params => {
//                     await dispatch('profile:fetch', {
//                       token: params.token,
//                     }).then(() => {
//                       pushNotification({
//                         message: `welcome ${params.displayName}`,
//                       })
//                       goBack()
//                     })
//                   },
//                 }

//                 window.open(
//                   `http://${
//                     import.meta.env.VITE_BACKEND_URL
//                   }/api/v1/auth/google`,
//                   '_blank',
//                   'popup=yes,width=550,height:650',
//                 )
//               }}
//             >
//               <Group>
//                 <BrandGoogle />
//                 <Text>Use Google</Text>
//               </Group>
//             </Button>
//             <Button
//               onClick={() => setStage('./email')}
//               color="red"
//               variant="filled"
//               style={{ height: 48 }}
//             >
//               <Group>
//                 <Mail />
//                 <Text>Use Email</Text>
//               </Group>
//             </Button>
//             <Button
//               onClick={() => {
//                 dispatch('user:offline', {})
//                 goBack()
//               }}
//               color="primaryColor"
//               variant="filled"
//               style={{ height: 48 }}
//             >
//               <Group>
//                 <WifiOff />
//                 <Text>Continue Offline</Text>
//               </Group>
//             </Button>
//           </Stack>
//         </Box>
//         <Box style={{ margin: '0 20px' }}>
//           <Group
//             sx={{ marginBottom: '20px', cursor: 'pointer' }}
//             onClick={() => setStage('.')}
//             align="center"
//           >
//             <ActionIcon
//               variant="light"
//               color="primaryColor"
//               size="xl"
//               radius="xl"
//             >
//               <ArrowBackUp />
//             </ActionIcon>
//             <Title order={2}>Using Email</Title>
//           </Group>
//           <Email />
//         </Box>
//       </NextStage>
//     </>
//   )
// }

// function Email() {
//   const [login, setLogin] = useState(true)
//   return (
//     <>
//       <NextStage gap="20px" nextStage={!login}>
//         <LoginEmail />
//         <RegisterEmail />
//       </NextStage>
//       <Text pt={20} align="center">
//         {login ? "You don't have an account, " : 'You have an account, '}
//         <Text
//           component="span"
//           color={'blue'}
//           sx={{ cursor: 'pointer' }}
//           onClick={() => setLogin(o => !o)}
//         >
//           {login ? 'sign up' : 'login'}
//         </Text>
//       </Text>
//     </>
//   )
// }

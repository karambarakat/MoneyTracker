import NextStage from '@components/CSSTransition/NextStage'
import LoginEmail from '@components/Forms/Email_login'
import RegisterEmail from '@components/Forms/Email_register'
import { RootState, UserState } from '@redux/types'
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ArrowBackUp, BrandGoogle, Mail, WifiOff } from 'tabler-icons-react'
import { useDispatch, useSelector } from 'react-redux'

const data = [
  {
    stage: './google',
    color: 'blue',
    icon: <BrandGoogle />,
    title: 'Use Google',
  },
  { stage: './email', color: 'red', icon: <Mail />, title: 'Using Email' },
  {
    stage: './local',
    color: 'primaryColor',
    icon: <WifiOff />,
    title: 'Continue Offline',
  },
]

function Authenticate() {
  const [opened, setOpened] = useState(true)
  /**
   * select the user state from redux,
   * I can use `useLocalStorage` instead of useSelector because I use `redux-localstorage-simple` middleware in redux
   * useLocalStorage will be updated if other tabs changed the local storage state
   */
  // const user = useSelector((s: any) => s.user)

  const user = useSelector<RootState, UserState>((s) => s.user)

  const [stage, setStage] = useState<'.' | './email'>('.')
  const dispatch = useDispatch()

  return (
    <>
      {!user?.loggedIn && (
        <Modal
          //@ts-ignore
          padding={'20px 0'}
          closeOnClickOutside={false}
          styles={{ modal: { overflow: 'hidden' } }}
          withCloseButton={false}
          centered
          opened={!user?.loggedIn}
          onClose={() => setOpened(false)}
        >
          <NextStage nextStage={stage === './email'}>
            <Box style={{ margin: '0 20px' }}>
              <Title order={2} align="center" mb={28}>
                Set Up An Account Before Continuing
              </Title>
              <Stack>
                <Button
                  color="blue"
                  variant="filled"
                  style={{ height: 48 }}
                  onClick={() => {
                    // @ts-ignore
                    window._dispatchReact = dispatch
                    window.open(
                      'http://localhost:8811/api/v1/auth/google',
                      '_blank',
                      'popup=yes,width=550,height:650'
                    )
                  }}
                >
                  <Group>
                    <BrandGoogle />
                    <Text>Use Google</Text>
                  </Group>
                </Button>
                <Button
                  onClick={() => setStage('./email')}
                  color="red"
                  variant="filled"
                  style={{ height: 48 }}
                >
                  <Group>
                    <Mail />
                    <Text>Use Email</Text>
                  </Group>
                </Button>
                <Button
                  onClick={() =>
                    //todo:
                    alert('this feature is not available right now')
                  }
                  color="primaryColor"
                  variant="filled"
                  style={{ height: 48 }}
                >
                  <Group>
                    <WifiOff />
                    <Text>Continue Offline</Text>
                  </Group>
                </Button>
              </Stack>
            </Box>
            <Box style={{ margin: '0 20px' }}>
              <Group
                sx={{ marginBottom: '20px', cursor: 'pointer' }}
                onClick={() => setStage('.')}
                align="center"
              >
                <ActionIcon
                  variant="light"
                  color="primaryColor"
                  size="xl"
                  radius="xl"
                >
                  <ArrowBackUp />
                </ActionIcon>
                <Title order={2}>Using Email</Title>
              </Group>
              <Email />
            </Box>
          </NextStage>
        </Modal>
      )}
      <Outlet />
    </>
  )
}

function Email() {
  const [login, setLogin] = useState(true)
  return (
    <>
      <NextStage gap="20px" nextStage={!login}>
        <LoginEmail />
        <RegisterEmail />
      </NextStage>
      <Text pt={20} align="center">
        {login ? "You don't have an account, " : 'You have an account, '}
        <Text
          component="span"
          color={'blue'}
          sx={{ cursor: 'pointer' }}
          onClick={() => setLogin((o) => !o)}
        >
          {login ? 'sign up' : 'login'}
        </Text>
      </Text>
    </>
  )
}

export default Authenticate

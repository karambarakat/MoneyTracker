import { Outlet } from 'react-router-dom'
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
import { ArrowBackUp, BrandGoogle, Mail, WifiOff } from 'tabler-icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from '@components/ReactRouter'

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

export default function () {
  const [stage, setStage] = useState<'.' | './email'>('.')
  const dispatch = useDispatch()
  const { exit } = useRoutes()

  return (
    <>
      <NextStage nextStage={stage === './email'}>
        <Box style={{ margin: '0 20px' }}>
          <Title order={2} align="center" mb={28}>
            Select Authorization Method
          </Title>
          <Stack>
            <Button
              color="indigo"
              variant="filled"
              style={{ height: 48 }}
              onClick={() => {
                // @ts-ignore
                window._dispatchReact = dispatch
                // @ts-ignore
                window._modal = exit
                window.open(
                  'http://localhost:8811/api/v1/auth/google',
                  '_blank',
                  'popup=yes,width=100,height:100'
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

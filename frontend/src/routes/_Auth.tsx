import NextStage from '@components/CSSTransition/NextStage'
import LoginEmail from '@components/Forms/LoginEmail'
import RegisterEmail from '@components/Forms/RegisterEmail'
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import useInterval from '@myHooks/useInterval'
import { Dispatch, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { ArrowBackUp, BrandGoogle, Mail, WifiOff } from 'tabler-icons-react'

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
  const user = useSelector((s: any) => s.user)

  console.log(user)

  const [stage, setStage] = useState<'.' | './email'>('.')

  return (
    <>
      {!user.provider && (
        <Modal
          //@ts-ignore
          padding={'20px 0'}
          closeOnClickOutside={false}
          styles={{ modal: { overflow: 'hidden' } }}
          withCloseButton={false}
          centered
          opened={!user.provider}
          onClose={() => setOpened(false)}
        >
          <NextStage nextStage={stage === './email'}>
            <Box style={{ margin: '0 20px' }}>
              <Title order={2} align='center' mb={28}>
                Set Up An Account Before Continuing
              </Title>
              <Stack>
                <Button color='blue' variant='filled' style={{ height: 48 }}>
                  <Group>
                    <BrandGoogle />
                    <Text>Use Google</Text>
                  </Group>
                </Button>
                <Button
                  onClick={() => setStage('./email')}
                  color='red'
                  variant='filled'
                  style={{ height: 48 }}
                >
                  <Group>
                    <Mail />
                    <Text>Use Email</Text>
                  </Group>
                </Button>
                <Button
                  color='primaryColor'
                  variant='filled'
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
                align='center'
              >
                <ActionIcon
                  variant='light'
                  color='primaryColor'
                  size='xl'
                  radius='xl'
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
      <NextStage gap='20px' nextStage={!login}>
        <LoginEmail />
        <RegisterEmail />
      </NextStage>
      <Text pt={20} align='center'>
        {login ? "You don't have an account, " : 'You have an account, '}
        <Text
          component='span'
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

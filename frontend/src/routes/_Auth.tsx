import NextStage from '@components/CSSTransition/NextStage'
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

  const [stage, setStage] = useState<'.' | './email'>('.')

  return (
    <>
      <Modal
        styles={{ modal: { overflow: 'hidden' } }}
        withCloseButton={false}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Box sx={{ margin: '0 -20px' }}>
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
              <RegisterEmail />
            </Box>
          </NextStage>
        </Box>
      </Modal>
      <Outlet />
    </>
  )
}

export default Authenticate

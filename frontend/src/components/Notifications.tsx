import { Box, Notification, Text } from '@mantine/core'
import {
  dismissNotification,
  pushNotification,
  useNotification,
} from '@myHooks/notifications'
import action from 'src/actions'
import Stack from './CSSTransition/Stack'
import TextEllipsis from './TextEllipsis'

setTimeout(() => {
  action({ type: 'log:create', num: 23 })
}, 150)
setTimeout(() => {
  action({ type: 'log:create', num: 23 })
}, 300)
setTimeout(() => {
  action({ type: 'log:create', num: 23 })
}, 450)
setTimeout(() => {
  action({ type: 'log:create', num: 23 })
}, 600)
setTimeout(() => {
  action({ type: 'log:create', num: 23 })
}, 750)
action({ type: 'log:create', num: 23 })

const Notifications$ = () => {
  const state = useNotification()

  return (
    <Box
      sx={{ zIndex: 1000, position: 'fixed', bottom: '1rem', right: '1rem' }}
    >
      <Stack>
        {state.map((noti) => {
          return (
            <Box key={noti.id} pt={8}>
              <Notification
                styles={{
                  description: {
                    display: 'flex',
                    gap: '0.7rem',
                    alignItems: 'baseline',
                    flexWrap: 'nowrap',
                  },
                }}
                onClose={() => dismissNotification(noti.id)}
              >
                <TextEllipsis>{noti.message}</TextEllipsis>
                {noti.react?.map((react) => (
                  <Text
                    onClick={() => {
                      action(react.action)
                    }}
                    sx={{ cursor: 'pointer' }}
                    color={react.style?.color || 'blue'}
                  >
                    {react.display}
                  </Text>
                ))}
              </Notification>
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}

export default Notifications$

import { Box, Notification, Text } from '@mantine/core'
import {
  dismissNotification,
  pushNotification,
  ReactionI,
  useNotification,
} from '@myHooks/notifications'
import dispatch, { dispatchTuple } from '@redux/dispatch'
import Stack from './CSSTransition/Stack'
import TextEllipsis from './TextEllipsis'
import { useState } from 'react'

function Notifications$() {
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
                color={noti.display === 'failure' ? 'red' : 'blue'}
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
                {noti.reactions?.map(
                  (react, index) =>
                    react && <Reaction key={index} react={react} />
                )}
              </Notification>
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}

function Reaction({ react }: { react: ReactionI }) {
  const [triggered, setTriggered] = useState(false)
  return (
    <Text
      onClick={() => {
        !triggered &&
          dispatchTuple(react.dispatch).then(() => setTriggered(true))
      }}
      sx={{
        cursor: !triggered ? 'pointer' : 'default',
        userSelect: triggered ? 'none' : 'initial',
      }}
      color={triggered ? 'gray' : react.style?.color || 'blue'}
    >
      {react.display}
    </Text>
  )
}

export default Notifications$

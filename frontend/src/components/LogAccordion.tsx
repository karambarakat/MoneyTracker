import { Accordion, Button, Group, Spoiler, Stack, Text } from '@mantine/core'
import { LogDoc } from '@redux/types'
import moment from 'moment'
import React from 'react'

function LogAccordion({ log }: { log: LogDoc }) {
  return (
    <Accordion.Item value={log._id} key={log._id}>
      <Accordion.Control>
        <Group style={{ justifyContent: 'space-between' }}>
          <div>{log.title}</div>
          <div>${log.amount}</div>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
          {log.note ? (
            <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
              {log.note}
            </Spoiler>
          ) : (
            <Text color={'gray'} variant="text">
              notes are not provided
            </Text>
          )}

          <Text color={'gray'} variant="text">
            last updated: {moment(log.updateAt).format('lll')}
          </Text>

          <Stack justify={'end'} style={{ flexDirection: 'row' }}>
            <Button variant="light" color={'red'}>
              Delete
            </Button>
            <Button>Edit</Button>
          </Stack>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default LogAccordion

import {
  Accordion,
  Box,
  Button,
  Group,
  Spoiler,
  Stack,
  Text,
} from '@mantine/core'
import log_delete from '@redux/api/log_delete'
import { store } from '@redux/index'
import { LogDoc } from '@redux/types'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import CategoryIcon from './category/CategoryIcon'
import { Link } from './ReactRoute'

function LogAccordion({ log }: { log: LogDoc }) {
  const nav = useNavigate()
  return (
    <Accordion.Item value={log._id} key={log._id}>
      <Accordion.Control>
        <Group style={{ justifyContent: 'space-between' }}>
          <CategoryIcon cat={log.category} />
          <Box sx={{ flex: 1 }}>{log.title}</Box>
          <div>${log.amount}</div>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
          {log.note ? (
            <Spoiler
              sx={{ whiteSpace: 'pre' }}
              maxHeight={120}
              showLabel="Show more"
              hideLabel="Hide"
            >
              {log.note}
            </Spoiler>
          ) : (
            <Text color={'gray'} variant="text">
              (notes are not provided)
            </Text>
          )}

          {log.category ? (
            <Text>
              Category:{' '}
              <Text sx={{ display: 'inline' }} color={log.category.color}>
                {log.category.title}
              </Text>
            </Text>
          ) : (
            <Text color={'gray'} variant="text">
              (not categorized)
            </Text>
          )}

          <Text color={'gray'} variant="text">
            last updated: {moment(log.updateAt || log.createdAt).format('lll')}
          </Text>

          <Stack justify={'end'} style={{ flexDirection: 'row' }}>
            <Button
              variant="light"
              color={'red'}
              onClick={() => log_delete(log._id)}
            >
              Delete
            </Button>
            <Link to={'/editLog/' + log._id} as_modal>
              <Button>Edit</Button>
            </Link>
          </Stack>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default LogAccordion
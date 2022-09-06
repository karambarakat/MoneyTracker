import AddLogButton from '@components/AddLogButton'
import {
  Accordion,
  Button,
  Card,
  Divider,
  Group,
  Spoiler,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import log_find from '@redux/api/log_find'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { LogsState, RootState } from '@redux/types'
import moment from 'moment'
import segregate from 'src/utils/segregate'
import LogAccordion from '@components/LogAccordion'

//
function Index_Page_Component() {
  const logs = useSelector<RootState, LogsState>((s) => s.logs)
  useEffect(() => {
    log_find()
  }, [])

  // separate logs by their days
  const keys = useRef<string[]>([])
  const logs_ = useMemo(() => {
    const s = segregate(logs, (log) =>
      moment(log.createdAt).format('l')
    ).reverse()
    keys.current = s.map((s) => {
      if (!s[0]) return ''
      const m = moment(s[0].createdAt)
      return m.calendar().replace(/ at.*/, '') + m.format(', MMM Do, YYYY')
    })
    return s
  }, [logs])

  // one Accordion
  const [value, setValue] = useState<string>('')

  return (
    <Stack spacing={'lg'}>
      {logs_.map((logs__, i) => (
        <div key={keys.current[i]}>
          <Divider my="xs" label={keys.current[i]} labelPosition="center" />
          <Card shadow={'xs'}>
            <Accordion
              chevron={''}
              // @ts-ignore
              styles={{
                control: { padding: '16px' },
                chevron: {
                  display: 'none',
                },
              }}
              variant="filled"
              value={value}
              onChange={(str) => setValue(str || '')}
            >
              {logs__.map((log) => (
                <LogAccordion log={log} />
              ))}
            </Accordion>
          </Card>
        </div>
      ))}

      <AddLogButton />
    </Stack>
  )
}

export default Index_Page_Component

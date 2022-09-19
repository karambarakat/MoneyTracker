import AddLogButton from '@components/AddLogButton'
import { Accordion, Card, Divider, Stack } from '@mantine/core'
import log_find from '@redux/api/log_find'
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
  const logs_ = useMemo(() => {
    const s = segregate(logs, (log) => moment(log.createdAt).format('l'))

    return s.map((subList) => {
      if (!subList[0]) return { key: '', subList }
      const m = moment(subList[0].createdAt)

      return {
        key: m.calendar().replace(/ at.*/, '') + m.format(', MMM Do, YYYY'),
        subList,
      }
    })
  }, [logs])
  // console.log(logs_.map((e) => e.subList.length + ' ' + e.key).join('\n'))

  // one Accordion
  const [value, setValue] = useState<string>('')

  return (
    <Stack spacing={'lg'}>
      {logs_.map((logs__, i) => (
        <div key={logs__.key}>
          <Divider my="xs" label={logs__.key} labelPosition="center" />
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
              {logs__.subList.map((log) => (
                <LogAccordion key={log._id} log={log} />
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

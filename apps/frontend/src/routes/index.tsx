import { useCallback } from 'react'
import AddLogButton from '@src/components/AddLogButton'
import { Accordion, Card, Divider, Stack, Text } from '@mantine/core'
import dispatch from '@src/redux/dispatch'
import { useEffect, useRef, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { LogsState, RootState, UserState } from '@src/redux/types'
import moment from 'moment'
import segregate from 'src/utils/segregate'
import LogAccordion from '@src/components/LogAccordion'
import MyPaper from '@src/components/MyPaper'
import { setTitle } from '@src/components/ReactRoute/index'
import { title } from '@src/components/ReactRoute/Page'
import EmptyLogs from '@src/components/alternates/EmptyLogs'
import getLogs from '@src/redux/actions/getData/getLogs'

function Index_Page_Component() {
  const [logs, { empty }] = getLogs()

  setTitle('Home')

  const user = useSelector<RootState, UserState>(s => s.user)

  // separate logs by their days
  const logs_ = useMemo(() => {
    const s = segregate(
      logs.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
      log => moment(log.createdAt).format('l')
    )

    return s.map(subList => {
      if (!subList[0]) return { key: '', subList }
      const m = moment(subList[0].createdAt)
      const c = m.calendar()
      const f1s = !Number.parseInt(c) ? c : m.format('dddd')

      return {
        key: f1s.replace(/ (at \d).*/, '') + m.format(', MMM Do, YYYY'),
        subList
      }
    })
  }, [logs])
  // console.log(logs_.map((e) => e.subList.length + ' ' + e.key).join('\n'))

  // one Accordion
  const [value, setValue] = useState<string>('')

  return (
    <Stack spacing={'lg'}>
      {empty ? (
        <EmptyLogs />
      ) : (
        logs_.map((logs__, i) => (
          <div key={logs__.key}>
            <Divider my="xs" label={logs__.key} labelPosition="center" />
            <MyPaper>
              <Accordion
                chevron={''}
                // @ts-ignore
                styles={{
                  control: { padding: '16px' },
                  chevron: {
                    display: 'none'
                  }
                }}
                variant="filled"
                value={value}
                onChange={str => setValue(str || '')}
              >
                {logs__.subList.map(log => (
                  <LogAccordion key={log._id} log={log} />
                ))}
              </Accordion>
            </MyPaper>
          </div>
        ))
      )}
      <AddLogButton />
    </Stack>
  )
}

export default Index_Page_Component

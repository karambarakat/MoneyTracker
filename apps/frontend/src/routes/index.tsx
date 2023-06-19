import React from 'react'
import { useCallback } from 'react'
import AddLogButton from '@src/components/AddLogButton'
import { Accordion, Divider, Stack } from '@mantine/core'
import dispatch from '@src/redux/dispatch'
import { useEffect, useRef, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, UserState } from '@src/redux/types'
import moment from 'moment'
import segregate from 'src/utils/segregate'
import LogAccordion from '@src/components/LogAccordion'
import MyPaper from '@src/components/MyPaper'
import { setTitle } from '@src/components/ReactRoute/index'
import EmptyLogs from '@src/components/alternates/EmptyLogs'
import { find_log } from '@src/api/Logs'
import { useQuery } from '@tanstack/react-query'

function Index_Page_Component() {
  setTitle('Home')

  const { data } = useQuery({
    queryKey: ['logs'],
    queryFn: find_log,
  })

  if (!data) throw new Error('suspense option should be enabled ?')

  // const [logs, { empty }] = getLogs()

  // const user = useSelector<RootState, UserState>(s => s.user)

  // separate logs by their days
  const logs = useMemo(() => {
    const s = segregate(
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
      log => moment(log.createdAt).format('l'),
    )

    return s.map(subList => {
      if (!subList[0]) return { key: '', subList }
      const m = moment(subList[0].createdAt)
      const c = m.calendar()
      const f1s = !Number.parseInt(c) ? c : m.format('dddd')

      return {
        key: f1s.replace(/ (at \d).*/, '') + m.format(', MMM Do, YYYY'),
        subList,
      }
    })
  }, [data])

  return (
    <div>
      {logs.map((logs_, i) => (
        <div key={logs_.key}>
          <Divider my="xs" label={logs_.key} labelPosition="left" />
        </div>
      ))}
    </div>
  )

  return <div>found: {JSON.stringify(logs)}</div>

  // one Accordion

  // return (
  //   <Stack spacing={'lg'}>
  //     {logs.map((logs_, i) => (
  //       <div key={logs_.key}>
  //         <Divider my="xs" label={logs_.key} labelPosition="center" />
  //         <MyPaper>
  //           <Accordion
  //             chevron={''}
  //             // @ts-ignore
  //             styles={{
  //               control: { padding: '16px' },
  //               chevron: {
  //                 display: 'none',
  //               },
  //             }}
  //             variant="filled"
  //             value={value}
  //             onChange={str => setValue(str || '')}
  //           >
  //             {logs_.subList.map(log => (
  //               <LogAccordion key={log._id} log={log} />
  //             ))}
  //           </Accordion>
  //         </MyPaper>
  //       </div>
  //     ))}
  //     <AddLogButton />
  //   </Stack>
  // )
}

export default Index_Page_Component

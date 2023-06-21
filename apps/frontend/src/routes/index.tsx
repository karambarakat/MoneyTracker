import React, { Fragment, createContext, useContext } from 'react'
import { useCallback } from 'react'
import AddLogButton from '@src/components/AddLogButton'
// import { Accordion, Divider, Stack } from '@mantine/core'
import Divider, { DividerWithLabel } from 'ui/src/components/Divider'
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
import { create_log, find_log, find_one_log } from '@src/api'
import { useMutation, useQuery } from '@tanstack/react-query'
import tw from 'twin.macro'
import { ActionOutput } from '@src/utils/fetch_'
import OneOpenAtATime from '@src/utils/OneOpenAtATime'
import { Field, Form, Formik, useFormik, useFormikContext } from 'formik'

const { Provider, useOneState } = OneOpenAtATime()
function Index_Page_Component() {
  setTitle('Home')

  const { data } = useQuery({
    queryKey: ['logs'],
    queryFn: find_log(),
  })

  if (!data) throw new Error('suspense option should be enabled ?')

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
    <Provider>
      <div css={{ '&>*': tw`mt-4` }}>
        <AddLog />
        {logs.map((logs_, i) => (
          <Fragment key={logs_.key}>
            <div key={logs_.key}>
              <DividerWithLabel labelPosition={'left'}>
                {logs_.key}
              </DividerWithLabel>
            </div>
            {logs_.subList.map(log => (
              <LogEntry key={log._id} log={log} />
            ))}
          </Fragment>
        ))}
      </div>
    </Provider>
  )
}

function noContext(fn: (...args: any[]) => any) {
  return (...args: any[]) => fn(...args)
}

function AddLog() {
  const mutation = useMutation({
    mutationFn: noContext(args => create_log(args)),
  })
  return (
    <Formik initialValues={{ title: 'h' }} onSubmit={v => mutation.mutate(v)}>
      <Form>
        <Field name="title" />
        <button type="submit">submit</button>
      </Form>
    </Formik>
  )
}

function LogEntry({ log }: { log: ActionOutput<typeof find_one_log> }) {
  const [expand, setExpand] = useOneState()

  // todo refactoring: better styles
  return (
    <div
      onClick={() => setExpand(s => !s)}
      tw="hover:bg-slate-100/50 cursor-pointer rounded-md p-3 py-1"
    >
      <div>{log.category?.title || 'no category'}</div>
      <div>{log.title}</div>
      <div>{log.note}</div>
      <div>{log.amount}</div>
      {expand && (
        <div>
          <div>
            last updated:{' '}
            {moment(log.updatedAt || log.createdAt)
              .format('MMM Do, YYYY ___ h:mm a')
              .replace('___', 'at')}
          </div>
          {/* // todo refactoring: when designing the update page */}
          <div>click to edit</div>
        </div>
      )}
    </div>
  )
}

// return <div>found: {JSON.stringify(logs)}</div>

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
// }

export default Index_Page_Component

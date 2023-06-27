import React, { Fragment } from 'react'
// import { Accordion, Divider, Stack } from '@mantine/core'
import { useMemo, useState } from 'react'
import moment from 'moment'
import segregate from 'src/utils/segregate'
import tw from 'twin.macro'
import { OneStateProvider } from '@src/utils/OneOpenAtATime'
import AddLog from '../component/forms/AddLog'
import LogEntry from '@src/component/LogEntry'
import { useLogs } from '@src/api/log_queries'
import { setTitle } from './_MetaContext'
import { DividerWithLabel } from 'ui/src/components/Divider'

function Index_Page_Component() {
  setTitle('Home')

  const [page, setPage] = useState(1)

  const { data } = useLogs({ page, pageSize: 6 })

  const pagination = data.meta.pagination

  // divide logs into their respective dates from T[] to {key: string, subList: T[]}[], where T extends { createdAt: string }
  const logs = useMemo(() => {
    if (!data?.data || !(data?.data instanceof Array)) return []
    const s = segregate(
      // if not sorted you may have duplicate keys
      data?.data.sort(
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
  }, [data?.data])

  return (
    <OneStateProvider>
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
      {pagination.pageCount > 1 && (
        <div tw="flex justify-center gap-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            css={page === 1 && tw`text-gray-400/50`}
          >
            Previous
          </button>
          <div>
            {pagination.page}/{pagination.pageCount}
          </div>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === pagination.pageCount}
            css={page === pagination.pageCount && tw`text-gray-400/50`}
          >
            Next
          </button>
        </div>
      )}
    </OneStateProvider>
  )
}

export default Index_Page_Component

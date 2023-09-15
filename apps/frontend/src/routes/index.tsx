import React, { Fragment } from 'react'
// import { Accordion, Divider, Stack } from '@mantine/core'
import { useMemo, useState } from 'react'
import * as luxon from 'luxon'
import tw from 'twin.macro'
import { OneStateProvider } from '../utils/OneOpenAtATime'
import AddEntry from '../components/forms/AddEntry'
import LogEntry from '../components/LogEntry'
import { setTitle } from './_MetaContext'
import { DividerWithLabel } from 'ui/src/components/Divider'
import groupBy from 'lodash/groupBy'
import { useQuery } from '@tanstack/react-query'
import { queries, queryKeys } from '../api'
function Index_Page_Component() {
  setTitle('Home')

  const [page, setPage] = useState(1)

  const { data: data_ } = useQuery({
    queryFn: () => queries.find_log({ page, pageSize: 10 }),
    queryKey: ['find_log', { page, pageSize: 10 }] satisfies queryKeys,
    keepPreviousData: true,
  })

  if (!data_) return <div>error</div>

  const { data, ...pagination } = data_

  const logs = useMemo(() => {
    if (!data || !(data instanceof Array)) return []

    //.format('l'))
    const migrate = groupBy(data, log =>
      luxon.DateTime.fromISO(log.createdAt).toFormat('l'),
    )

    return Object.entries(migrate)
      .map(([key, subList]) => {
        // let newKey = moment(key).calendar()
        // newKey = !Number.parseInt(newKey) ? newKey : moment(key).format('dddd')
        // newKey =
        //   newKey.replace(/ (at \d).*/, '') +
        //   moment(key).format(', MMM Do, YYYY')
        const newKey = luxon.DateTime.fromISO(key)
        const newKey2 = newKey.toRelative() + newKey.toFormat(', MMM Do, YYYY')

        return {
          key: newKey2,
          subList,
        }
      })
      .reverse()
  }, [data])

  return (
    <OneStateProvider>
      <div css={{ '&>*': tw`mt-4` }}>
        <AddEntry />
        {logs.map((logs_, i) => (
          <Fragment key={logs_.key}>
            <div key={logs_.key}>
              <DividerWithLabel labelPosition={'left'}>
                {logs_.key}
              </DividerWithLabel>
            </div>
            {logs_.subList.map(log => (
              <LogEntry key={log.id} log={log} />
            ))}
          </Fragment>
        ))}
      </div>
      {pagination.totalPages > 1 && (
        <div tw="flex justify-center gap-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            css={page === 1 && tw`text-gray-400/50`}
          >
            Previous
          </button>
          <div>
            {pagination.page}/{pagination.totalPages}
          </div>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === pagination.totalPages}
            css={page === pagination.totalPages && tw`text-gray-400/50`}
          >
            Next
          </button>
        </div>
      )}
    </OneStateProvider>
  )
}

export default Index_Page_Component

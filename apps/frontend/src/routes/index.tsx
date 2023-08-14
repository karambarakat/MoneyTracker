import React, { Fragment } from 'react'
// import { Accordion, Divider, Stack } from '@mantine/core'
import { useMemo, useState } from 'react'
import moment from 'moment'
import tw from 'twin.macro'
import { OneStateProvider } from '../utils/OneOpenAtATime'
import AddLog from '../components/forms/AddLog'
import LogEntry from '../components/LogEntry'
import { setTitle } from './_MetaContext'
import { DividerWithLabel } from 'ui/src/components/Divider'
import groupBy from 'lodash/groupBy'
import { useQuery, useQueryOption } from '../api/query'
function Index_Page_Component() {
  setTitle('Home')

  const [page, setPage] = useState(1)

  const { data } = useQueryOption(
    {
      keepPreviousData: true,
    },
    API.queryAPI.find_log,
    { page, pageSize: 10 },
  )

  if (!data) return <div>error</div>

  const pagination = data.meta.pagination

  const logs = useMemo(() => {
    if (!data?.data || !(data?.data instanceof Array)) return []

    const migrate = groupBy(data?.data, log =>
      moment(log.createdAt).format('l'),
    )

    return Object.entries(migrate)
      .map(([key, subList]) => {
        let newKey = moment(key).calendar()
        newKey = !Number.parseInt(newKey) ? newKey : moment(key).format('dddd')
        newKey =
          newKey.replace(/ (at \d).*/, '') +
          moment(key).format(', MMM Do, YYYY')
        return {
          key: newKey,
          subList,
        }
      })
      .reverse()
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

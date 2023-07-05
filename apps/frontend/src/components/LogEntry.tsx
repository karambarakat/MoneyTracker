import React from 'react'
import { find_one_log } from '@src/api'
import { useDeleteLog, useLog } from '@src/api/log_queries'
import { useOneState } from '@src/utils/OneOpenAtATime'
import { OutputOfAction } from '@src/lib/react-query'
import moment from 'moment'
import { useState } from 'react'
import tw from 'twin.macro'
import EditLog from './forms/EditLog'

export default function LogEntry({
  log,
}: {
  log: OutputOfAction<typeof find_one_log>
}) {
  const [expand, setExpand] = useOneState()
  const [edit, setEdit] = useState(false)

  const freshData = useLog(log._id)

  const data = freshData.status === 'success' ? freshData.data : log

  const delete_ = useDeleteLog()

  return (
    <div tw="hover:bg-slate-200/50 dark:hover:bg-slate-600/10 rounded-md p-3 py-1">
      <div tw="text-indigo-600">
        {delete_.status === 'loading' && 'deleting'}
        {delete_.status === 'success' && 'deleted'}
      </div>
      <div>{data.category?.title || 'no category'}</div>
      <div>{data.title}</div>
      <div>{data.note}</div>
      <div>{data.amount}</div>
      {expand ? (
        <button onClick={() => setExpand(false)}>show less</button>
      ) : (
        <button onClick={() => setExpand(true)}>expand</button>
      )}
      {expand && (
        <div>
          <div>
            last updated:{' '}
            {moment(data.updatedAt || data.createdAt)
              .format('MMM Do, YYYY ___ h:mm a')
              .replace('___', 'at')}
          </div>
          {edit ? (
            <>
              <button tw="mr-3" onClick={() => setEdit(false)}>
                close editing
              </button>
              <EditLog log={data} />
            </>
          ) : (
            <button tw="mr-3" onClick={() => setEdit(true)}>
              click to edit
            </button>
          )}
          <button
            disabled={delete_.status !== 'idle'}
            css={
              delete_.status !== 'idle' && tw`text-gray-300 pointer-events-none`
            }
            onClick={() => delete_.mutate({ _id: data._id })}
          >
            click to delete
          </button>
        </div>
      )}
    </div>
  )
}

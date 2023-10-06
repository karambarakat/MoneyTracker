import React from 'react'
import { delete_entry } from '../api/mutations'
import { useOneState } from '../utils/OneOpenAtATime'
import { useState } from 'react'
import tw from 'twin.macro'
import EditEntry from './forms/EditEntry'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getQueryKey, queries, queryKeys } from '../api'
import { Entry } from 'types/gql/graphql'
import { DateTime } from 'luxon'

type Defined<T> = T extends undefined | null ? never : T

export default function LogEntry({ log }: { log: Entry }) {
  const [expand, setExpand] = useOneState()
  const [edit, setEdit] = useState(false)

  const freshData_ = useQuery({
    queryKey: ['find_one_log', { id: log.id }] satisfies queryKeys,
    queryFn: () => queries.find_one_log({ id: log.id }),
  })
  const freshData = freshData_.status === 'success' && freshData_.data

  const data = freshData ? freshData : log

  // const delete_ = useDeleteLog()
  const client = useQueryClient()
  const delete_ = useMutation({
    mutationFn: delete_entry,
    onSettled: () => {
      delete_entry.shouldInvalidate(client, undefined as any, { id: log.id })
    },
  })

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
            {/* {moment(data.updatedAt || data.createdAt)
              .format('MMM Do, YYYY ___ h:mm a')
              .replace('___', 'at')} */}
            {DateTime.fromISO(data.updatedAt || data.createdAt)
              .toFormat('MMM dd, yyyy ___ h:mm a')
              .replace('___', 'at')}
          </div>
          {edit ? (
            <>
              <button tw="mr-3" onClick={() => setEdit(false)}>
                close editing
              </button>
              <EditEntry
                entry={{
                  entry: { ...data, category: data.category?.id },
                  id: data.id,
                }}
              />
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
            onClick={() => delete_.mutate({ id: data.id })}
          >
            click to delete
          </button>
        </div>
      )}
    </div>
  )
}

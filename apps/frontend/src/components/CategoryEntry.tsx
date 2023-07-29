import React from 'react'
import { delete_category, find_one_category } from '../api'
import { useOneState } from '../utils/OneOpenAtATime'
import { useState } from 'react'
import tw from 'twin.macro'
import EditCategory from './forms/EditCategory'
import { useQuery } from '../lib/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apis } from '../api/type'

export default function CategoryEntry({
  category,
}: {
  category: Awaited<ReturnType<typeof find_one_category>>
}) {
  const [expand, setExpand] = useOneState()
  const [edit, setEdit] = useState(false)

  const freshData = useQuery('find_one_category', [{ _id: category._id }])

  const data = freshData.status === 'success' ? freshData.data : category

  const client = useQueryClient()
  const delete_ = useMutation({
    mutationFn: delete_category,
    onSettled: () => {
      client.invalidateQueries([
        'find_one_category',
        { _id: category._id },
      ] satisfies apis)
      client.invalidateQueries(['find_category'] satisfies apis)
    },
  })

  return (
    <div tw="hover:bg-slate-200/50 dark:hover:bg-slate-600/10 rounded-md p-3 py-1">
      <div tw="text-indigo-600">
        {delete_.status === 'loading' && 'deleting'}
        {delete_.status === 'success' && 'deleted'}
      </div>
      <div>{data.title}</div>
      <div>{data.icon || 'no icon'}</div>
      <div>{data.color || 'no color'}</div>
      {expand ? (
        <button onClick={() => setExpand(false)}>show less</button>
      ) : (
        <button onClick={() => setExpand(true)}>expand</button>
      )}
      {expand && (
        <div>
          {edit ? (
            <>
              <button tw="mr-3" onClick={() => setEdit(false)}>
                close editing
              </button>
              <EditCategory category={data} />
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

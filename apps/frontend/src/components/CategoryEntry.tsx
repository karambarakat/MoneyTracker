import React from 'react'
import { delete_category } from '../api/mutations'
import { useOneState } from '../utils/OneOpenAtATime'
import { useState } from 'react'
import tw from 'twin.macro'
import EditCategory from './forms/EditCategory'
import { queryKeys } from '../api/index'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queries } from '../api'

export default function CategoryEntry({
  category,
}: {
  category: Awaited<ReturnType<typeof queries.find_one_category>>
}) {
  const [expand, setExpand] = useOneState()
  const [edit, setEdit] = useState(false)

  const freshData = useQuery({
    queryFn: () => queries.find_one_category({ id: category.id }),
    queryKey: ['find_one_category', { id: category.id }] satisfies queryKeys,
  })

  const data = freshData.status === 'success' ? freshData.data : category

  const client = useQueryClient()
  const delete_ = useMutation({
    mutationFn: delete_category,
    onSettled: () => {
      client.invalidateQueries([
        delete_category.shouldInvalidate[0],
      ] satisfies queryKeys)
      client.invalidateQueries([
        delete_category.shouldInvalidate[1],
        { id: category.id },
      ] satisfies queryKeys)
    },
  })

  return (
    <div tw="hover:bg-slate-200/50 dark:hover:bg-slate-600/10 rounded-md p-3 py-1">
      <div tw="text-indigo-600 text[#004299]">
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

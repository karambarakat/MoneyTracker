import tw from 'twin.macro'
import React, { useState } from 'react'
import { OneStateProvider } from '../utils/OneOpenAtATime'
import { setTitle } from './_MetaContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mutations, queries, queryKeys } from '../api'
import Spinning from 'ui/src/components/Spinning'
import { CategoryIcon } from '../components/category_utils/CategoryIcon'
import TextEllipsis from 'ui/src/components/TextEllipsis'
import { useHover } from '@mantine/hooks'
import { CategoryFragment, CategoryInput } from 'types/gql/graphql'
import Hoverable from 'ui/src/components/Hoverable'
import { AiFillDelete, AiFillWarning, AiTwotoneEdit } from 'react-icons/ai'
import Tooltip from 'ui/src/components/Tooltip'
import Dialog from 'ui/src/components/Dialog'
import {
  CreateCategoryForm,
  UpdateCategoryFormActionPortal,
} from '../components/CategoryForm'

function Entries() {
  const entries = useQuery({
    queryFn: () => queries.find_category(),
    queryKey: ['find_category'] satisfies queryKeys,
  })

  if (!entries.data)
    return (
      <div tw="min-h-[200px] grid place-content-center">
        <Spinning />
      </div>
    )

  return (
    <>
      <div tw="grid justify-between gap-5 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {entries.data.map(e => {
          return <CategoryEntry key={e.id} category={e} />
        })}
      </div>
    </>
  )
}

function CategoryEntry({ category }: { category: CategoryFragment }) {
  const { hovered, ref } = useHover()
  const { id, ...pureValues } = category

  const [editPortal, setEditPortal] = useState(false)

  const client = useQueryClient()
  const delete_ = useMutation({
    mutationFn: () => mutations.delete_category({ id }),
    useErrorBoundary: false,
    onSuccess: () => mutations.delete_category.shouldInvalidate(client, { id }),
  })

  const update = useMutation({
    mutationFn: (args: { category: CategoryInput }) =>
      mutations.update_category({ id, category: args.category }),
    useErrorBoundary: false,
    onSuccess: () => {
      mutations.update_category.shouldInvalidate(client, { id })
      setEditPortal(false)
    },
  })

  return (
    <div ref={ref} tw="flex gap-3 items-center select-none">
      <CategoryIcon
        tw="flex-shrink-0"
        icon={category.icon || undefined}
        color={category.color as never}
      />
      <TextEllipsis tw="flex-1">{category.title}</TextEllipsis>
      {(delete_.isLoading || update.isLoading) && (
        <span>
          <Spinning />
        </span>
      )}
      {delete_.error && (
        <Tooltip content={'error deleting'}>
          <AiFillWarning tw="fill-red-400" />
        </Tooltip>
      )}
      {update.error && (
        <Tooltip content={'error updating'}>
          <AiFillWarning tw="fill-red-400" />
        </Tooltip>
      )}

      <Dialog
        open={editPortal}
        onOpenChange={setEditPortal}
        content={
          <UpdateCategoryFormActionPortal
            initialValues={pureValues}
            action={({ category }) => update.mutateAsync({ category })}
          />
        }
        trigger={
          <span>
            {hovered && (
              <Hoverable asChild>
                <button
                  type="button"
                  // onClick={() => update.mutate()}
                  aria-label="edit category"
                  tw="cursor-pointer rounded p-1"
                >
                  <AiTwotoneEdit tw="fill-blue-800 dark:fill-blue-400" />
                </button>
              </Hoverable>
            )}
          </span>
        }
      ></Dialog>

      {hovered && (
        <Hoverable asChild>
          <button
            onClick={() => delete_.mutate()}
            type="button"
            aria-label="delete category"
            tw="cursor-pointer rounded p-1"
          >
            <AiFillDelete tw="fill-red-800 dark:fill-red-400" />
          </button>
        </Hoverable>
      )}
    </div>
  )
}

function Category_Page_Component() {
  setTitle('Categories')

  const { data } = useQuery({
    queryFn: queries.find_category,
    queryKey: ['find_category'] satisfies queryKeys,
  })

  if (!data) return <div>error</div>

  return (
    <div css={{ '&>*': tw`mt-4` }}>
      <CreateCategoryForm />
      <OneStateProvider>
        <Entries />
      </OneStateProvider>
    </div>
  )
}

export default Category_Page_Component

import tw from 'twin.macro'
import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { useState } from 'react'
import Dialog from 'ui/src/components/Dialog'
import { setTitle } from './_MetaContext'
import { AiFillPlusCircle } from 'react-icons/ai'
import {
  CreateEntryFormPortal,
  UpdateEntryFormActionPortal,
} from '../components/EntryForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mutations, queries, queryKeys } from '../api'
import {
  EntryFragment,
  EntryInput,
  PaginationRequest,
  PaginationResponse,
} from 'types/gql/graphql'
import { groupBy } from 'lodash'
import { DateTime } from 'luxon'
import { DividerWithLabel } from 'ui/src/components/Divider'
import Hoverable, { HoverableLighter } from 'ui/src/components/Hoverable'
import { CategoryIcon } from '../components/category_utils/CategoryIcon'
import Text from 'ui/src/components/Text'
import { useHover } from '@mantine/hooks'
import Button from 'ui/src/components/Button'
import { AiFillDelete, AiFillWarning, AiTwotoneEdit } from 'react-icons/ai'
import ButtonIcon from 'ui/src/components/ButtonIcon'
import { iconBlue, iconRed } from '../utils/tw'
import Spinning from 'ui/src/components/Spinning'
import Tooltip from 'ui/src/components/Tooltip'
import EmptyImg from '../components/EmptyImg'
import Pagination from '../components/Pagination'

export default function Index_Page_Component() {
  setTitle('Home')

  const [page, setPage] = useState<PaginationRequest>({
    page: 1,
    pageSize: 10,
  })

  const query = useQuery({
    queryFn: ({ queryKey: [fn, ...args] }) => queries[fn](...args),
    queryKey: ['find_log', page] satisfies queryKeys,
  })

  if (!query.data) return <div>error</div>

  const { data, ...pageInfo } = query.data

  const logs = useMemo(() => {
    if (!data || !(data instanceof Array)) return []
    const groups = groupBy(data, log =>
      DateTime.fromISO(log.createdAt).toFormat('MMM dd, yyyy'),
    )

    return Object.entries(groups).map(([day, subList]) => {
      const ISO = subList[0].createdAt
      const relative = DateTime.fromISO(ISO).toRelative({
        unit: 'days',
      })

      const relative2 =
        relative === '0 days ago'
          ? 'today'
          : relative === '1 day ago'
          ? 'yesterday'
          : relative

      const key = `${relative2}, ${day}`

      return {
        key,
        subList,
      }
    })
  }, [data])

  const [dialog, setDialog] = useState(false)

  if (logs.length === 0) {
    return (
      <div
        tw="flex flex-col gap-5 items-center mt-12"
        css={{ marginLeft: 'var(--home-padding)' }}
      >
        <EmptyImg />
        <div>
          your logs are empty, you can{' '}
          <Dialog
            open={dialog}
            content={<CreateEntryFormPortal setState={setDialog} />}
            trigger={
              <span
                onClick={() => setDialog(true)}
                tw="cursor-pointer dark:text-blue-400 text-blue-500"
              >
                add new entry
              </span>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div tw="min-h-[100%] h-full relative flex flex-col flex-1 pb-4">
      <Dialog
        open={dialog}
        content={<CreateEntryFormPortal setState={setDialog} />}
        trigger={
          <div
            onClick={() => setDialog(true)}
            aria-label="add new entry"
            tw="fixed bottom-0 right-0 mb-4 mr-8 dark:bg-slate-700 bg-slate-100 rounded-full"
          >
            <AiFillPlusCircle
              size={30}
              tw="text-primary-500 transform scale-[1.4]"
            />
          </div>
        }
      />

      {logs.map(({ key, subList }, i) => (
        <div key={i}>
          <div
            tw="select-none mb-1"
            css={{ paddingLeft: 'var(--home-padding)' }}
          >
            <span tw="sr-only">
              entries created on{' '}
              <time dateTime={key}>{subList[0].createdAt}</time>
            </span>
            <DividerWithLabel labelPosition="left">{key}</DividerWithLabel>
          </div>

          {subList.map((entry, i) => (
            <div css={{ '&>*': tw`mb-2` }} key={i}>
              <Entry entry={entry} />
            </div>
          ))}
        </div>
      ))}

      <div css={[tw`mt-4`, { '&>*': tw`mb-4` }]}></div>
      <span tw="flex-1" />

      <div css={{ paddingLeft: 'var(--home-padding)' }}>
        {pageInfo.totalPages > 1 && (
          <Pagination pageInfo={pageInfo} setPage={setPage} />
        )}
      </div>
    </div>
  )
}

function Entry({ entry: { id, ...entry } }: { entry: EntryFragment }) {
  const { hovered, ref } = useHover()
  const [editPortal, setEditPortal] = useState(false)

  const client = useQueryClient()
  const delete_ = useMutation({
    mutationFn: () => mutations.delete_entry({ id }),
    useErrorBoundary: false,
    onSuccess: () =>
      mutations.update_entry.shouldInvalidate(client, null, { id }),
  })

  const update = useMutation({
    mutationFn: (args: { entry: EntryInput }) =>
      mutations.update_entry({ id, entry: args.entry }),
    useErrorBoundary: false,
    onSuccess: () => {
      mutations.update_entry.shouldInvalidate(client, null, { id })
      setEditPortal(false)
    },
  })

  return (
    <HoverableLighter asChild>
      <div ref={ref} tw="px-2 py-1 rounded-md flex items-center gap-2 ">
        <CategoryIcon
          icon={entry.category?.icon || undefined}
          color={entry.category?.color || (undefined as any)}
        />
        <span>{entry.title}</span>
        <Text size="subtle">{entry.note}</Text>
        <span tw="flex-1" />

        {(delete_.isLoading || update.isLoading) && (
          <span>
            <Spinning />
          </span>
        )}

        {hovered && (
          <Hoverable asChild>
            <button
              onClick={() => delete_.mutateAsync()}
              type="button"
              tw="rounded p-1"
              aria-label="delete entry"
            >
              <AiFillDelete css={iconRed} />
            </button>
          </Hoverable>
        )}

        <Dialog
          open={editPortal}
          onOpenChange={setEditPortal}
          content={
            <UpdateEntryFormActionPortal
              initialValues={{ ...entry, category: entry.category?.id }}
              // @ts-expect-error
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              action={({ entry: { updatedAt, createdAt, ...entry } }) =>
                update.mutateAsync({ entry })
              }
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
                    <AiTwotoneEdit css={iconBlue} />
                  </button>
                </Hoverable>
              )}
            </span>
          }
        ></Dialog>

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

        <span>{entry.amount} $</span>
      </div>
    </HoverableLighter>
  )
}

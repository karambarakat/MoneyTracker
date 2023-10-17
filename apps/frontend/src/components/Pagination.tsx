import { Dispatch, Fragment, SetStateAction, useMemo } from 'react'
import tw from 'twin.macro'
import { PaginationRequest, PaginationResponse } from 'types/gql/graphql'
import { HoverableLighter } from 'ui/src/components/Hoverable'

export default function Pagination({
  pageInfo,
  setPage,
  padding,
}: {
  pageInfo: Omit<PaginationResponse, 'data'>
  setPage: Dispatch<SetStateAction<PaginationRequest>>
  padding?: number
}) {
  const state = useMemo(() => {
    const padding_ = padding || 2
    const slice = padding ? padding_ * 2 + 1 : 5
    const cut = pageInfo.totalPages > slice + 1 ? slice : Infinity

    const endCut =
      pageInfo.page +
      padding_ +
      (pageInfo.page < padding_ + 1 ? padding_ - pageInfo.page + 1 : 0)

    const endCut2 = endCut >= pageInfo.totalPages - 2 ? undefined : endCut + 1

    const startCut = pageInfo.page - padding_

    const startCut2 = startCut < 3 ? 0 : startCut - 1

    const list = Array.from({ length: pageInfo.totalPages })
      // .slice(0, cut)
      .map((e, i) => {
        return { num: i + 1, current: pageInfo.page === i + 1 }
      })

    return {
      concat: cut
        ? {
            firstInvisible: startCut2 > 0,
            lastInvisible: typeof endCut2 === 'undefined' ? false : true,
          }
        : null,
      list: list.slice(startCut2, endCut2),
    }
  }, [pageInfo])

  return (
    <div tw="flex gap-3 items-center">
      {state.concat?.firstInvisible && (
        <Fragment>
          <div
            onClick={() => setPage({ page: 1, pageSize: pageInfo.pageSize })}
          >
            <PaginationUnit data={{ current: false, num: 1 }} />
          </div>
          <span tw="select-none">...</span>
        </Fragment>
      )}

      {state.list.map(e => {
        return (
          <div
            key={e.num}
            onClick={() =>
              setPage({ page: e.num, pageSize: pageInfo.pageSize })
            }
          >
            <PaginationUnit data={e} />
          </div>
        )
      })}

      {state.concat?.lastInvisible && (
        <Fragment>
          <span tw="select-none">...</span>
          <div
            onClick={() =>
              setPage({
                page: pageInfo.totalPages,
                pageSize: pageInfo.pageSize,
              })
            }
          >
            <PaginationUnit
              data={{ current: false, num: pageInfo.totalPages }}
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}

function PaginationUnit({ data }: { data: { current: boolean; num: number } }) {
  return (
    <HoverableLighter asChild>
      <span
        tw="rounded-md select-none p-2 px-4 aspect-square"
        css={
          data.current
            ? tw`bg-slate-200 hover:bg-slate-200! dark:bg-slate-800 dark:hover:bg-slate-800!`
            : tw`cursor-pointer`
        }
      >
        {data.num}
      </span>
    </HoverableLighter>
  )
}

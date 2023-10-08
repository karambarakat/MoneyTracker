import tw from 'twin.macro'
import React, { useState } from 'react'
import Dialog from 'ui/src/components/Dialog'
import { setTitle } from './_MetaContext'
import { AiFillPlusCircle } from 'react-icons/ai'
import { CreateEntryFormPortal } from '../components/EntryForm'
import { useQuery } from '@tanstack/react-query'
import { queries, queryKeys } from '../api'
import { PaginationRequest } from 'types/gql/graphql'

export default function Index_Page_Component() {
  setTitle('Home')

  const [page, setPage] = useState<PaginationRequest>({
    page: 1,
    pageSize: 10,
  })

  const data = useQuery({
    queryFn: ({ queryKey: [fn, ...args] }) => queries[fn](...args),
    queryKey: ['find_log', page] satisfies queryKeys,
  })

  data.data?.data[0]?.amount

  return (
    <div>
      <Dialog
        content={<CreateEntryFormPortal />}
        trigger={
          <div
            aria-label="add new entry"
            tw="fixed bottom-0 right-0 mb-4 mr-8 cursor-pointer dark:bg-slate-700 bg-slate-100 rounded-full"
          >
            <AiFillPlusCircle
              size={30}
              tw="text-primary-500 transform scale-[1.4]"
            />
          </div>
        }
      />

      {/* {Array.from({ length: 20 }).map((_, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius dicta
          velit amet quibusdam, adipisci non a maiores quam nemo provident?
        </p>
      ))} */}
      <div css={[tw`mt-4`, { '&>*': tw`mb-4` }]}></div>
    </div>
  )
}

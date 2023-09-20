import { useState } from 'react'
import tw from 'twin.macro'
import { setTitle } from './_MetaContext'
import SimpleTextField from 'ui/src/components/forms/SimpleTextField'
import { Form } from 'ui/src/components/forms/_Form'
import SimpleNumberField from 'ui/src/components/forms/SimpleNumberField'
import { Plus } from 'tabler-icons-react'
// function Index_Page_Component() {
//   setTitle('Home')

//   const [page, setPage] = useState(1)

//   const { data: data_ } = useQuery({
//     queryFn: () => queries.find_log({ page, pageSize: 10 }),
//     queryKey: ['find_log', { page, pageSize: 10 }] satisfies queryKeys,
//     keepPreviousData: true,
//   })

//   if (!data_) return <div>error</div>

//   const { data, ...pagination } = data_

//   const logs = useMemo(() => {
//     if (!data || !(data instanceof Array)) return []

//     //.format('l'))
//     const migrate = groupBy(data, log =>
//       luxon.DateTime.fromISO(log.createdAt).toFormat('l'),
//     )

//     return Object.entries(migrate)
//       .map(([key, subList]) => {
//         const newKey = luxon.DateTime.fromISO(key)
//         const newKey2 = newKey.toRelative() + newKey.toFormat(', MMM Do, YYYY')

//         return {
//           key: newKey2,
//           subList,
//         }
//       })
//       .reverse()
//   }, [data])

//   return (
//     <OneStateProvider>
//       <div css={{ '&>*': tw`mt-4` }}>
//         <AddEntry />
//         {logs.map((logs_, i) => (
//           <Fragment key={logs_.key}>
//             <div key={logs_.key}>
//               <DividerWithLabel labelPosition={'left'}>
//                 {logs_.key}
//               </DividerWithLabel>
//             </div>
//             {logs_.subList.map(log => (
//               <LogEntry key={log.id} log={log} />
//             ))}
//           </Fragment>
//         ))}
//       </div>
//       {pagination.totalPages > 1 && (
//         <div tw="flex justify-center gap-4">
//           <button
//             onClick={() => setPage(page - 1)}
//             disabled={page === 1}
//             css={page === 1 && tw`text-gray-400/50`}
//           >
//             Previous
//           </button>
//           <div>
//             {pagination.page}/{pagination.totalPages}
//           </div>
//           <button
//             onClick={() => setPage(page + 1)}
//             disabled={page === pagination.totalPages}
//             css={page === pagination.totalPages && tw`text-gray-400/50`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </OneStateProvider>
//   )
// }

// export default Index_Page_Component
export default function Index_Page_Component() {
  setTitle('Home')

  const [open, setOpen] = useState<boolean>(true)

  return (
    <div css={[tw`mt-4`, { '&>*': tw`mb-4` }]}>
      {open ? (
        <Form
          then={ctx => ctx.setValues({}, false)}
          action={async v => console.log(v)}
          required={['title', 'amount']}
        >
          <div tw="grid grid-cols-2 gap-3">
            <SimpleTextField name="title" />

            <SimpleNumberField name="amount" />
          </div>
          <SimpleTextField name="note" />
          <div tw="flex gap-3 justify-end">
            <button onClick={() => setOpen(false)}>Close</button>
            <button>Submit</button>
          </div>
        </Form>
      ) : (
        <div tw="flex justify-center">
          <button onClick={() => setOpen(true)} tw="flex gap-2">
            <Plus />
            Add New Entry
          </button>
        </div>
      )}
    </div>
  )
}

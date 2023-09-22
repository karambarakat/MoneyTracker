import Divider from 'ui/src/components/Divider'
import Dialog from 'ui/src/components/Dialog'
import tw from 'twin.macro'
import { setTitle } from './_MetaContext'
import { AiFillPlusCircle } from 'react-icons/ai'
import { Form } from 'ui/src/components/forms/_Form'
import SimpleNumberField from 'ui/src/components/forms/SimpleNumberField'
import SimpleTextField from 'ui/src/components/forms/SimpleTextField'
import Button from 'ui/src/components/Button'

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

  return (
    <div>
      <Dialog
        content={<AddNewEntry />}
        open
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

      {Array.from({ length: 20 }).map((_, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius dicta
          velit amet quibusdam, adipisci non a maiores quam nemo provident?
        </p>
      ))}
      <div css={[tw`mt-4`, { '&>*': tw`mb-4` }]}></div>
    </div>
  )
}

function AddNewEntry() {
  return (
    <div
      aria-label="Add new Entry"
      tw="z-50 fixed inset-0 shadow-2xl w-[550px] max-w-[80vw] p-4 rounded-md h-fit m-auto bg-slate-800 border-slate-500 border"
    >
      <Form
        then={ctx => ctx.setValues({}, false)}
        action={async v => console.log(v)}
        required={['title', 'amount']}
      >
        <div tw="flex gap-2">
          <svg
            tw="h-[32px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
          >
            <path d="m44,20V6h-6v16h-12V6h-6v14c0,4.94-3.06,8-8,8v30h40v-30c-4.94,0-8-3.06-8-8Zm-2,27l-10,5-10-5v-11h20v11Z"></path>
          </svg>
          <SimpleTextField tw="text-2xl" name="title" title="Entry Title" />
        </div>
        <SimpleNumberField name="amount" />
        <SimpleTextField name="note" />
        <Divider tw="-mx-4 my-4" />
        <div tw="flex gap-3 justify-end">
          <Dialog.Close asChild>
            <Button variant="subtle" color="slate" size="null" tw="py-1 px-2">
              Close
            </Button>
          </Dialog.Close>
          <Button variant="filled" size="null" tw="py-1 px-2">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}

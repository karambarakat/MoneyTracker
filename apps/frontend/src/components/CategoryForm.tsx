import { PropsOf } from '@emotion/react'
import Button from 'ui/src/components/Button'
import Dialog from 'ui/src/components/Dialog'
import Divider from 'ui/src/components/Divider'
import SimpleNumberField from 'ui/src/components/forms/SimpleNumberField'
import SimpleTextField from 'ui/src/components/forms/SimpleTextField'
import { Form } from 'ui/src/components/forms/_Form'
import Tooltip from 'ui/src/components/Tooltip'
import 'twin.macro'
import { BsFillCircleFill } from 'react-icons/bs'
import { useQuery } from '@tanstack/react-query'

const colors = [
  { name: 'Grey', color: 'rgb(85, 83, 78)' },
  { name: 'Silver', color: 'rgb(166, 162, 153)' },
  { name: 'Brown', color: 'rgb(159, 107, 83)' },
  { name: 'Gold', color: 'rgb(203, 145, 47)' },
  { name: 'Orange', color: 'rgb(217, 115, 13)' },
  { name: 'Blue', color: 'rgb(51, 126, 169)' },
  { name: 'Purple', color: 'rgb(144, 101, 176)' },
  { name: 'Magenta', color: 'rgb(193, 76, 138)' },
  { name: 'Red', color: 'rgb(212, 76, 71)' },
]

import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import ScrollArea from 'ui/src/components/ScrollArea'
import { WithAsChild } from 'ui/src/utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'
import { Suspense } from 'react'

function IconPicker() {
  const { data } = useQuery({
    queryFn: async () => {
      // @ts-expect-error
      const res = await import('./icons')
      return res.default.split('\n') as string[]
    },
    queryKey: ['icons'],
  })

  if (!data) return <div>error</div>

  // if (status === 'loading')
  //   return (
  //     <div>
  //       <AiOutlineLoading3Quarters />
  //     </div>
  //   )

  return (
    <ScrollArea>
      <div tw="flex flex-wrap gap-2 mr-3">
        {data?.map((value, key) => {
          return (
            <div tw="min-w-[24px] min-h-[24px] fill-green-700">
              <svg
                viewBox="0 0 64 64"
                key={key}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={value} />
              </svg>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}

function Hoverable(props: WithAsChild) {
  const Component = props.asChild ? Slot : 'div'
  return (
    <Component
      tw="hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-700 dark:active:bg-slate-600"
      {...props}
    />
  )
}

function ColorPicker() {
  return (
    <div tw="flex gap-2">
      {colors.map(e => {
        return (
          <Hoverable tw="rounded p-1">
            <BsFillCircleFill color={e.color} size={16} />
          </Hoverable>
        )
      })}
      <span></span>
    </div>
  )
}

export default function CategoryForm(
  props: Omit<PropsOf<typeof Form>, 'required'>,
) {
  return (
    <div
      aria-label="Add new Entry"
      tw="p-4 rounded-md dark:bg-slate-800 dark:border-slate-500 bg-slate-100 border-slate-400 border"
    >
      <Form required={['title', 'amount']} {...props}>
        <div tw="flex flex-col gap-2">
          <SimpleTextField tw="text-2xl" name="title" title="Category Title" />
          <div tw="h-48 grid gap-2 place-content-center">
            <Suspense
              fallback={
                <div>
                  <AiOutlineLoading3Quarters />
                </div>
              }
            >
              <ColorPicker />
              <IconPicker />
            </Suspense>
          </div>
          <SimpleTextField name="note" />
          <Divider tw="-mx-4 my-4 dark:bg-slate-500 bg-slate-400" />
          <div tw="flex gap-3 justify-end">
            <Button variant="filled" size="null" tw="py-1 px-2">
              Create New Category
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

import { PropsOf } from '@emotion/react'
import Button from 'ui/src/components/Button'
import Dialog from 'ui/src/components/Dialog'
import Divider from 'ui/src/components/Divider'
import SimpleNumberField from 'ui/src/components/forms/SimpleNumberField'
import SimpleTextField from 'ui/src/components/forms/SimpleTextField'
import { Form } from 'ui/src/components/forms/_Form'
import Tooltip from 'ui/src/components/Tooltip'
import 'twin.macro'

export default function EntryForm(
  props: Omit<PropsOf<typeof Form>, 'required'>,
) {
  return (
    <div
      aria-label="Add new Entry"
      tw="p-4 rounded-md dark:bg-slate-800 dark:border-slate-500 bg-slate-100 border-slate-400 border"
    >
      <Form required={['title', 'amount']} {...props}>
        <div tw="flex gap-2 w-full">
          <Tooltip content={<div>Change Category</div>}>
            <svg
              tw="h-[32px] fill-primary-700 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path d="m38.49,32h-14.49V8h24v18h-6.04l-3.46,6Zm-18.49,4v-14c-7.73,0-14,6.27-14,14s6.27,14,14,14,14-6.27,14-14h-14Zm27.73-6h-3.46l-12.12,21c.77,1.33.96,1.67,1.73,3h24.25c.77-1.33.96-1.67,1.73-3l-12.12-21Z"></path>
            </svg>
          </Tooltip>
          <div tw="flex-1">
            <SimpleTextField tw="text-2xl" name="title" title="Entry Title" />
          </div>
        </div>
        <SimpleNumberField name="amount" />
        <SimpleTextField name="note" />
        <Divider tw="-mx-4 my-4 dark:bg-slate-500 bg-slate-400" />
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

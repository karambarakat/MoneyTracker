import { PropsOf } from '@emotion/react'
import Button from 'ui/src/components/Button'
import Dialog from 'ui/src/components/Dialog'
import Divider from 'ui/src/components/Divider'
import SimpleNumberField from 'ui/src/components/forms/SimpleNumberField'
import SimpleTextField from 'ui/src/components/forms/SimpleTextField'
import { Form } from 'ui/src/components/forms/_Form'
import Tooltip from 'ui/src/components/Tooltip'
import 'twin.macro'
import { CategoryIconFromForm } from './category_utils/CategoryIcon'

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
            <CategoryIconFromForm
              names={{ icon: 'category.icon', color: 'category.color' }}
            />
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

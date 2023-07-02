import 'twin.macro'
import React from 'react'
import { InputOfAction } from '@src/utils/fetch_'
import { update_log } from '@src/api'
import { useUpdateLog } from '@src/api/log_queries'
import Form from '../facade/Form'
import Status from 'ui/src/components/forms/Status'
import TextField, {
  CategoryField,
  HiddenField,
  NumberField,
} from 'ui/src/components/forms/TextField'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { useCategories } from '@src/api/category_queries'

export default function EditLog({
  log,
}: {
  log: InputOfAction<typeof update_log>
}) {
  const mutate = useUpdateLog()
  const categories = useCategories().data

  return (
    <Form
      onSuccess={(values, ctx) => {
        ctx.setValues(log, false)
        ctx.setStatus({ success: 'updated' })
      }}
      initial={log}
      action={mutate}
    >
      <div tw="grid grid-cols-2 gap-3">
        <Status tw="col-span-2" />
        <HiddenField name="_id" />
        <TextField name="title" />
        <NumberField name="amount" />
        <TextField name="note" />
        <CategoryField
          options={categories.map(v => ({ value: v._id, label: v.title }))}
          name="category"
        />
        <SubmitButton tw="col-span-2 mt-2" size="lg">
          submit
        </SubmitButton>
      </div>
    </Form>
  )
}

import 'twin.macro'
import React from 'react'
import Form from '../facade/Form'

import Status from 'ui/src/components/forms/Status'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { useCreateLog } from '@src/api/log_queries'
import { useCategories } from '@src/api/category_queries'
import TextField, {
  CategoryField,
  NumberField,
} from 'ui/src/components/forms/TextField'

export default function AddLog() {
  const mutate = useCreateLog()
  const categories = useCategories().data

  return (
    <Form
      onSuccess={(values, ctx) => {
        ctx.setValues({} as any, false)
        ctx.setStatus({ success: 'created' })
      }}
      // initial={{}}
      action={mutate}
      properties={[]}
      required={['title', 'amount']}
    >
      <div tw="grid grid-cols-2 gap-3">
        <Status tw="col-span-2" />
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

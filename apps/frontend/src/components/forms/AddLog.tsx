import 'twin.macro'
import React from 'react'
import Form from '../facade/Form'

import Status from 'ui/src/components/forms/Status'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import TextField, {
  CategoryField,
  NumberField,
} from 'ui/src/components/forms/TextField'
import { useQuery } from '@src/lib/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create_log } from '@src/api'
import { apis } from '@src/api/type'

export default function AddLog() {
  const client = useQueryClient()
  const mutate = useMutation({
    mutationFn: create_log,
    onSettled: () => {
      client.invalidateQueries(['find_log'] satisfies apis)
    },
  })

  const categories = useQuery('find_category', []).data

  if (!categories) return <div>error</div>

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

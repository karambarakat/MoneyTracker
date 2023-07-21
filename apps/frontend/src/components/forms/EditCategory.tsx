import 'twin.macro'
import React from 'react'
// import { OutputOfAction } from '@src/lib/react-query'
import { create_category, update_category } from '@src/api'
import Form from '../facade/Form'

import TextField, { HiddenField } from 'ui/src/components/forms/TextField'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import Status from 'ui/src/components/forms/Status'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apis } from '@src/api/type'

export default function EditCategory({
  category,
}: {
  // category: OutputOfAction<typeof update_category>
  category: Awaited<ReturnType<typeof update_category>>
}) {
  // const mutate = useUpdateCategory()
  const client = useQueryClient()

  const mutate = useMutation({
    mutationFn: update_category,
    onSettled: () => {
      client.invalidateQueries(['find_category'] satisfies apis)
    },
  })

  return (
    <Form
      onSuccess={(values, ctx) => {
        ctx.setValues(category, false)
        ctx.setStatus({ success: 'updated' })
      }}
      initial={category}
      action={mutate}
    >
      <div tw="grid grid-cols-2 gap-3">
        <Status tw="col-span-2" />
        <HiddenField name="_id" />
        <TextField name="title" />
        <TextField name="color" />
        <TextField name="note" />
        <TextField name="icon" />
        <SubmitButton tw="col-span-2 mt-2" size="lg">
          submit
        </SubmitButton>
      </div>{' '}
    </Form>
  )
}

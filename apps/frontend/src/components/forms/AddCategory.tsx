import 'twin.macro'
import React from 'react'
import { Form, FormBody } from 'ui/src/components/forms/_Form'

import TextField from 'ui/src/components/forms/TextField'
import Status from 'ui/src/components/forms/Status'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { create_category } from '../../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKey } from '../../api/query'

export default function AddCategory() {
  const client = useQueryClient()
  const mutate = useMutation({
    mutationFn: create_category,
    onSettled: () => {
      client.invalidateQueries(queryKey(API.queryAPI.find_category))
    },
  })

  return (
    <Form
      then={ctx => {
        ctx.setValues({} as any, false)
        ctx.setStatus({ success: 'created' })
      }}
      action={mutate.mutateAsync}
      values={[]}
      required={['title']}
    >
      <FormBody>
        <div tw="grid grid-cols-2 gap-3">
          <Status tw="col-span-2" />
          <TextField name="title" />
          <TextField name="color" />
          <TextField name="note" />
          <TextField name="icon" />
          <SubmitButton tw="col-span-2 mt-2" size="lg">
            submit
          </SubmitButton>
        </div>
      </FormBody>
    </Form>
  )
}

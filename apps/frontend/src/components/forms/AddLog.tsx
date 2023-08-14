import 'twin.macro'
import React from 'react'
import { Form } from 'ui/src/components/forms/_Form'

import Status from 'ui/src/components/forms/Status'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import CategoryField from 'ui/src/components/forms/CategoryField'
import NumberField from 'ui/src/components/forms/NumberField'
import TextField from 'ui/src/components/forms/TextField'
import { queryKey, useQuery } from '../../api/query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create_log } from '../../api'

export default function AddLog() {
  const client = useQueryClient()
  const mutate = useMutation({
    mutationFn: create_log,
    onSettled: () => {
      client.invalidateQueries(
        queryKey(API.queryAPI.find_log, undefined as any),
      )
    },
  })

  const categories = useQuery(API.queryAPI.find_category).data

  if (!categories) return <div>error</div>

  return (
    <Form
      then={ctx => {
        ctx.setValues({} as any, false)
        // ctx.setStatus({ success: 'created' })
      }}
      action={mutate.mutateAsync}
      values={[]}
      required={['title', 'amount']}
    >
      <div tw="grid grid-cols-2 gap-3">
        <Status tw="col-span-2" onSuccess="created" />
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

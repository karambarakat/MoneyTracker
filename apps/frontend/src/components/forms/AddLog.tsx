import 'twin.macro'
import React from 'react'
import { Form } from 'ui/src/components/forms/_Form'

import Status from 'ui/src/components/forms/Status'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import CategoryField from 'ui/src/components/forms/CategoryField'
import NumberField from 'ui/src/components/forms/NumberField'
import TextField from 'ui/src/components/forms/TextField'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { create_log } from '../../api/mutations'
import { getQueryKey, queries, queryKeys } from '../../api'

export default function AddLog() {
  const client = useQueryClient()
  const mutate = useMutation({
    mutationFn: create_log,
    onSettled: () => {
      client.invalidateQueries([
        create_log.shouldInvalidate[0],
        undefined as never,
      ] satisfies queryKeys)
    },
  })

  const categories = useQuery({
    queryFn: () => queries.find_category(),
    // queryKey: getQueryKey('find_category'),
    queryKey: ['find_category'] satisfies queryKeys,
  }).data

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

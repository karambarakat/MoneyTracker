import 'twin.macro'
import React from 'react'
import { update_log } from '../../api/mutations'
import { Form } from 'ui/src/components/forms/_Form'

import Status from 'ui/src/components/forms/Status'
import CategoryField from 'ui/src/components/forms/CategoryField'
import HiddenField from 'ui/src/components/forms/HiddenField'
import NumberField from 'ui/src/components/forms/NumberField'
import TextField from 'ui/src/components/forms/TextField'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queries, queryKeys } from '../../api'

export default function EditLog({
  log,
}: {
  log: Parameters<typeof update_log>[0]
}) {
  const mutate = useMutation({ mutationFn: update_log })

  // const categories = useQuery(queryAPI.find_category).data
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
        ctx.setStatus({ success: 'edited' })
      }}
      action={mutate.mutateAsync}
      values={log}
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

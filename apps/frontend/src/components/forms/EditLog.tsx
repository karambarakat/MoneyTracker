import 'twin.macro'
import React from 'react'
import { useQuery } from '../../lib/react-query'
import { update_log } from '../../api'
import { Form } from 'ui/src/components/forms/Form'
import Status from 'ui/src/components/forms/Status'
import TextField, {
  CategoryField,
  HiddenField,
  NumberField,
} from 'ui/src/components/forms/TextField'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { useMutation } from '@tanstack/react-query'

export default function EditLog({
  log,
}: {
  log: Parameters<typeof update_log>[0]
}) {
  const mutate = useMutation({ mutationFn: update_log })

  const categories = useQuery('find_category', []).data

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

import 'twin.macro'
import React from 'react'
import { FormInterface } from 'ui/src/components/forms/_Form'

import Status from 'ui/src/components/forms/Status'
import CategoryField from 'ui/src/components/forms/CategoryField'
import HiddenField from 'ui/src/components/forms/HiddenField'
import SimpleNumberField from 'ui/src/components/forms/SimpleNumberField'
import TextField from 'ui/src/components/forms/TextField'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queries, queryKeys } from '../../api'
import {
  MutationUpdateOneCategoryArgs,
  MutationUpdateOneEntryArgs,
} from 'types/gql/graphql'
import { find_category } from '../../api/queries'
import { update_entry } from '../../api/mutations'

export default function EditEntry({
  entry,
}: {
  entry: MutationUpdateOneEntryArgs
}) {
  const mutate = useMutation({ mutationFn: update_entry })

  // const categories = useQuery(queryAPI.find_category).data
  const category = useQuery({
    queryFn: () => find_category(),
    // queryKey: getQueryKey('find_category'),
    queryKey: ['find_category'] satisfies queryKeys,
  }).data

  if (!category) return <div>error</div>

  return (
    <Form
      then={ctx => {
        ctx.setValues({} as any, false)
        ctx.setStatus({ success: 'edited' })
      }}
      action={mutate.mutateAsync}
      values={entry}
    >
      <div tw="grid grid-cols-2 gap-3">
        <Status tw="col-span-2" />
        <HiddenField name="_id" />
        <TextField name="title" />
        <SimpleNumberField name="amount" />
        <TextField name="note" />
        <CategoryField
          options={category.map(v => ({ value: v.id, label: v.title }))}
          name="category"
        />
        <SubmitButton tw="col-span-2 mt-2" size="lg">
          submit
        </SubmitButton>
      </div>
    </Form>
  )
}

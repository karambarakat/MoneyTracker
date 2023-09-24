import React from 'react'
import tw from 'twin.macro'
import { OneStateProvider } from '../utils/OneOpenAtATime'
import { setTitle } from './_MetaContext'
import CategoryEntry from '../components/CategoryEntry'
import { Form, FormBody } from 'ui/src/components/forms/_Form'
import Status from 'ui/src/components/forms/Status'
import TextField from 'ui/src/components/forms/TextField'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { create_category } from '../api/mutations'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queries, queryKeys } from '../api'
import CategoryForm from '../components/CategoryForm'

function AddCategory() {
  const client = useQueryClient()
  const mutate = useMutation({
    mutationFn: create_category,
    onSettled: () => {
      client.invalidateQueries([
        create_category.shouldInvalidate[0],
      ] satisfies queryKeys)
    },
  })
  //
  return (
    <Form
      then={ctx => {
        ctx.setValues({} as any, false)
        ctx.setStatus({ success: 'created' })
      }}
      action={mutate.mutateAsync}
      values={[]}
      // required={['title']}
    >
      <FormBody>
        <div tw="grid grid-cols-2 gap-3">
          <Status tw="col-span-2 " onSuccess="category Created" />
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

function Category_Page_Component() {
  setTitle('Categories')

  const { data } = useQuery({
    queryFn: () => queries.find_category(),
    queryKey: ['find_category'] satisfies queryKeys,
  })

  if (!data) return <div>error</div>

  return (
    <div css={{ '&>*': tw`mt-4` }}>
      <CategoryForm action={async v => console.log(v)} />
      <OneStateProvider>
        {/* {data.reverse().map(cat => (
          <CategoryEntry key={cat.id} category={cat} />
        ))} */}
      </OneStateProvider>
    </div>
  )
}

export default Category_Page_Component

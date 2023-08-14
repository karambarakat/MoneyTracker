import React from 'react'
import tw from 'twin.macro'
import { OneStateProvider } from '../utils/OneOpenAtATime'
import { setTitle } from './_MetaContext'
import CategoryEntry from '../components/CategoryEntry'
import { queryKey, useQuery } from '../api/query'
import { Form, FormBody } from 'ui/src/components/forms/_Form'
import Status from 'ui/src/components/forms/Status'
import TextField from 'ui/src/components/forms/TextField'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { create_category } from '../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function AddCategory() {
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

function Index_Page_Component() {
  setTitle('Categories')

  const { data } = useQuery(API.queryAPI.find_category)

  if (!data) return <div>error</div>

  return (
    <div css={{ '&>*': tw`mt-4` }}>
      <AddCategory />
      <OneStateProvider>
        {data.reverse().map(cat => (
          <CategoryEntry key={cat._id} category={cat} />
        ))}
      </OneStateProvider>
    </div>
  )
}

export default Index_Page_Component

import 'twin.macro'
import React from 'react'
import Button from 'ui/src/components/Button'
import { CategoryInput, Mutation } from 'types/gql/graphql'
import {
  CategoryBody,
  FormBody,
  FormFloating,
  FormFooter,
  FormRoot,
} from './_FormUtils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create_category, update_category } from '../api/mutations'
import { FormInterface } from 'ui/src/components/forms/_Form'
import Dialog from 'ui/src/components/Dialog'

type Input = CategoryInput

export function CreateCategoryForm() {
  const client = useQueryClient()
  const create = useMutation({
    mutationFn: create_category,
    onSettled: () => {
      create_category.shouldInvalidate(client)
    },
  })

  return (
    <FormRoot
      action={async category => create.mutateAsync({ category })}
      then={(ctx, vals) => {
        ctx.setStatus({ success: `"${vals.title}" was added` })
      }}
      values={undefined as unknown as Input}
      asChild
      required={['title']}
    >
      <div aria-label="Add New Category">
        <FormBody
          form={<CategoryBody />}
          footer={
            <FormFooter
              Button={props => <Button {...props}>Create New Category</Button>}
            />
          }
        />
      </div>
    </FormRoot>
  )
}

export function UpdateCategoryFormActionPortal({
  action,
  initialValues,
}: {
  initialValues: Input
  action: FormInterface<
    { category: CategoryInput },
    Mutation['updateOneCategory']
  >['action']
}) {
  return (
    <Dialog.Floating>
      <FormRoot
        action={async category => action({ category })}
        values={initialValues}
        then={(ctx, vals) => {
          vals === true && ctx.setStatus({ success: 'updated successfully' })
        }}
        asChild
        required={['title']}
      >
        <div aria-label="Update Category">
          <FormBody
            form={<CategoryBody />}
            footer={
              <FormFooter
                Button={props => <Button {...props}>Update</Button>}
              />
            }
          />
        </div>
      </FormRoot>
    </Dialog.Floating>
  )
}

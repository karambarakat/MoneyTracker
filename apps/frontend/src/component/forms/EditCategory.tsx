import 'twin.macro'
import React from 'react'
import { OutputOfAction } from '@src/utils/fetch_'
import { find_one_category } from '@src/api'
import { Form, Formik } from 'formik'
import { SchemaCategoryIn } from 'types/dist/ts/schema'
import { formikMutateOption, require } from '@src/utils/formikUtils'
import Status from 'ui/src/components/forms/Status'
import TextField from 'ui/src/components/forms/TextField'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { useUpdateCategory } from '@src/api/category_queries'

export default function EditCategory({
  category,
}: {
  category: OutputOfAction<typeof find_one_category>
}) {
  const mutate = useUpdateCategory()

  return (
    <Formik
      initialValues={category as Partial<SchemaCategoryIn>}
      onSubmit={(v, ctx) => {
        const [errors, values] = require<SchemaCategoryIn>(v, ['title'])

        if (errors) {
          ctx.setErrors(errors)
          return
        }

        const option = formikMutateOption(ctx)

        mutate.mutate(
          { _id: category._id, ...values },
          {
            ...option,
            onSuccess: (...args) => {
              option.onSuccess?.(...args)
              ctx.setStatus({ success: 'updated' })
            },
          },
        )
      }}
    >
      <Form tw="grid grid-cols-2 gap-3">
        <Status tw="col-span-2" />
        <TextField formikName="title" />
        <TextField formikName="color" />
        <TextField formikName="note" />
        <TextField formikName="icon" />
        <SubmitButton tw="col-span-2 mt-2" size="lg">
          submit
        </SubmitButton>
      </Form>
    </Formik>
  )
}
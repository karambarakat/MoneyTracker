import 'twin.macro'
import React from 'react'
import { formikMutateOption, require } from '@src/utils/formikUtils'
import { Form, Formik } from 'formik'
import { SchemaLogIn } from 'types/dist/ts/schema'
import TextField, {
  CategoryField,
  NumberField,
} from 'ui/src/components/forms/TextField'
import Status from 'ui/src/components/forms/status'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { useCreateLog } from '@src/api/log_queries'
import { useCategories } from '@src/api/category_queries'
import { lab } from 'd3'

export default function AddLog() {
  const mutate = useCreateLog()
  const categories = useCategories().data

  return (
    <Formik
      initialValues={
        {
          title: undefined,
          amount: undefined,
          note: undefined,
          category: undefined,
        } as Partial<SchemaLogIn>
      }
      onSubmit={(v, ctx) => {
        const [errors, values] = require<SchemaLogIn>(v, ['title', 'amount'])

        if (errors) {
          ctx.setErrors(errors)
          ctx.setSubmitting(false)
          return
        }

        const options = formikMutateOption(ctx)

        mutate.mutate(values, {
          ...options,
          onSuccess: (...args) => {
            ctx.setValues({}, false)

            options.onSuccess?.(...args)
            ctx.setStatus({ success: 'created' })
          },
        })
      }}
    >
      <Form tw="grid grid-cols-2 gap-3">
        <Status tw="col-span-2" />
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
      </Form>
    </Formik>
  )
}

import 'twin.macro'
import React from 'react'
import { formikMutateOption, require } from '@src/utils/formikUtils'
import { Form, Formik } from 'formik'
import { SchemaCategoryIn } from 'types/dist/ts/schema'
import TextField, { NumberField } from 'ui/src/components/forms/TextField'
import Status from 'ui/src/components/forms/status'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { useCreateLog } from '@src/api/log_queries'
import { useCreateCategory } from '@src/api/category_queries'

export default function AddCategory() {
  const mutate = useCreateCategory()

  return (
    <Formik
      initialValues={
        {
          title: undefined,
          color: undefined,
          note: undefined,
          icon: undefined,
        } as Partial<SchemaCategoryIn>
      }
      onSubmit={(v, ctx) => {
        const [errors, values] = require<SchemaCategoryIn>(v, ['title'])

        if (errors) {
          ctx.setErrors(errors)
          ctx.setSubmitting(false)
          return
        }

        const options = formikMutateOption(ctx)

        mutate.mutate(values, {
          ...options,
          onSuccess: (...args) => {
            options.onSuccess?.(...args)
            ctx.setStatus({ success: 'created' })
          },
        })
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

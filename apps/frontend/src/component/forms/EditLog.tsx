import 'twin.macro'
import React from 'react'
import { OutputOfAction } from '@src/utils/fetch_'
import { find_one_log } from '@src/api'
import { useUpdateLog } from '@src/api/log_queries'
import { Form, Formik } from 'formik'
import { SchemaLogIn } from 'types/dist/ts/schema'
import { formikMutateOption, require } from '@src/utils/formikUtils'
import Status from 'ui/src/components/forms/Status'
import TextField, {
  CategoryField,
  NumberField,
} from 'ui/src/components/forms/TextField'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { useCategories } from '@src/api/category_queries'

export default function EditLog({
  log,
}: {
  log: OutputOfAction<typeof find_one_log>
}) {
  const mutate = useUpdateLog()
  const categories = useCategories().data

  return (
    <Formik
      initialValues={log as Partial<SchemaLogIn>}
      onSubmit={(v, ctx) => {
        const [errors, values] = require<SchemaLogIn>(v, ['title', 'amount'])

        if (errors) {
          ctx.setErrors(errors)
          return
        }

        const option = formikMutateOption(ctx)

        mutate.mutate(
          { _id: log._id, ...values },
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
        <NumberField formikName="amount" />
        <TextField formikName="note" />
        <CategoryField
          options={categories.map(v => ({ value: v._id, label: v.title }))}
          formikName="category"
        />
        <SubmitButton tw="col-span-2 mt-2" size="lg">
          submit
        </SubmitButton>
      </Form>
    </Formik>
  )
}

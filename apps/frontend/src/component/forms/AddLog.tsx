import 'twin.macro'
import React from 'react'
import { Action, InputOfAction, mutation } from '@src/utils/fetch_'
import require from '@src/utils/formikUtils'
import { useMutation } from '@tanstack/react-query'
import { Field, Form, Formik, useFormik, useFormikContext } from 'formik'
import { SchemaLogIn, SchemaLogOut } from 'types/dist/schema'
import HttpError from 'types/src/httpErrors_default'
import TextField, { NumberField } from 'ui/src/components/forms/TextField'
import Status from 'ui/src/components/forms/status'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import Button from 'ui/src/components/Button'
import { PropsOf } from '@emotion/react'

const create_log: Action<SchemaLogIn, SchemaLogOut> =
  //
  data => ({
    path: '/log',
    method: 'POST',
    body: JSON.stringify(data),
  })

export default function AddLog() {
  const mutate = useMutation({
    mutationFn: mutation(create_log),
  })

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

        // todo test backend validation first
        // @ts-expect-error Argument of type 'Partial<SchemaLogIn>' is not assignable to parameter of type 'SchemaLogIn'.
        mutate.mutate(v, {
          onError: e => {
            if (e instanceof HttpError) {
              try {
                // @ts-ignore
                ctx.setErrors(e.payload.details.errors)
              } catch {
                console.log('destructuring error')
              }
              ctx.setStatus({ error: e.message })
            }
          },
          onSuccess(data, variables, context) {
            console.log({ data, variables, context })
            ctx.setSubmitting(false)
          },
        })
      }}
    >
      <Form tw="grid grid-cols-2 gap-3">
        <Status tw="col-span-2" />
        <TextField _formikName="title" />
        <NumberField _formikName="amount" />
        <TextField _formikName="note" />
        <TextField _formikName="category" />
        <SubmitButton tw="col-span-2 mt-2" size="lg">
          submit
        </SubmitButton>
      </Form>
    </Formik>
  )
}

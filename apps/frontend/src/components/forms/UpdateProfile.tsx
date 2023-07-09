import 'twin.macro'
import React from 'react'
import Form from '../facade/Form'

import TextField from 'ui/src/components/forms/TextField'
import Status from 'ui/src/components/forms/status'
import { useUpdateProfile } from '@src/api/auth_queries'
import { useFormikContext } from 'formik'
import { PropsOf } from '@emotion/react'
import Button from 'ui/src/components/Button'

export default function UpdateProfile() {
  const mutate = useUpdateProfile()

  return (
    <Form
      onSuccess={(values, ctx) => {
        ctx.setValues({} as any, false)
        ctx.setStatus({ success: 'profile updated' })
      }}
      action={mutate}
      properties={['displayName', 'picture']}
    >
      <div>
        <Status />
        <TextField name="displayName" />
        <TextField name="picture" />
        <SubmitButton tw="mt-2" size="lg">
          submit
        </SubmitButton>
      </div>
    </Form>
  )
}

function SubmitButton(
  Props: Omit<PropsOf<typeof Button>, 'disabled' | 'type'>,
) {
  const { isSubmitting, submitForm, values, setStatus } =
    useFormikContext<object>()

  return (
    <Button {...Props} disabled={isSubmitting} variant="light" asChild>
      <button
        onClick={() => {
          if (Object.values(values).filter(e => e).length === 0) {
            setStatus({ error: 'empty form' })
            return
          }
          submitForm()
        }}
        type="button"
      >
        Submit
      </button>
    </Button>
  )
}

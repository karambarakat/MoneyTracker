import 'twin.macro'
import React from 'react'
import Form from '../facade/Form'

import { PasswordField } from 'ui/src/components/forms/TextField'
import Status from 'ui/src/components/forms/Status'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { useMutation } from '@tanstack/react-query'
import { set_password } from '../../api'

export default function ResetPassword() {
  const mutate = useMutation({ mutationFn: set_password })

  return (
    <Form
      onSuccess={(values, ctx) => {
        ctx.setValues({} as any, false)
        ctx.setStatus({ success: 'password changed' })
      }}
      action={mutate}
      properties={['newPassword', 'oldPassword']}
      required={['newPassword', 'oldPassword']}
    >
      <div>
        <Status />
        <PasswordField name="oldPassword" />
        <PasswordField name="newPassword" />
        <SubmitButton tw="mt-2" size="lg">
          submit
        </SubmitButton>
      </div>
    </Form>
  )
}

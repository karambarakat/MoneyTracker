import 'twin.macro'
import React from 'react'
import { Form } from 'ui/src/components/forms/Form'

import { PasswordField } from 'ui/src/components/forms/TextField'
import Status from 'ui/src/components/forms/Status'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { useMutation } from '@tanstack/react-query'
import { set_password } from '../../api'

export default function ResetPassword() {
  const mutate = useMutation({ mutationFn: set_password })

  return (
    <Form
      then={ctx => {
        ctx.setValues({} as any, false)
        ctx.setStatus({ success: 'password changed' })
      }}
      action={mutate.mutateAsync}
      values={[]}
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

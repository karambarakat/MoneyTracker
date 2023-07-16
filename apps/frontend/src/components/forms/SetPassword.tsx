import 'twin.macro'
import React from 'react'
import Form from '../facade/Form'

import { PasswordField } from 'ui/src/components/forms/TextField'
import Status from 'ui/src/components/forms/Status'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { useSetPassword } from '@src/api/auth_queries'

export default function SetPassword() {
  const mutate = useSetPassword()

  return (
    <Form
      onSuccess={(values, ctx) => {
        ctx.setValues({} as any, false)
        ctx.setStatus({ success: 'password changed' })
      }}
      action={mutate}
      properties={['newPassword']}
      required={['newPassword']}
    >
      <div>
        <Status />
        <PasswordField name="oldPassword" />
        <SubmitButton tw="mt-2" size="lg">
          submit
        </SubmitButton>
      </div>
    </Form>
  )
}

import 'twin.macro'
import React from 'react'
import { Form } from 'ui/src/components/forms/_Form'

import SecretField from 'ui/src/components/forms/SecretField'
import Status from 'ui/src/components/forms/Status'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { set_password } from '../../api/mutations'
import { useMutation } from '@tanstack/react-query'

export default function SetPassword() {
  const mutate = useMutation({ mutationFn: set_password })

  return (
    <Form
      then={ctx => {
        ctx.setValues({} as any, false)
        ctx.setStatus({ success: 'password changed' })
      }}
      action={mutate.mutateAsync}
      values={[]}
      required={['newPassword']}
    >
      <div>
        <Status />
        <SecretField name="oldPassword" autoComplete="current-password" />
        <SubmitButton tw="mt-2" size="lg">
          submit
        </SubmitButton>
      </div>
    </Form>
  )
}

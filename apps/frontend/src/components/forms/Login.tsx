import 'twin.macro'
import React from 'react'
import Status from 'ui/src/components/forms/Status'
import EmailField from 'ui/src/components/forms/EmailField'
import PasswordField from 'ui/src/components/forms/PasswordField'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import tw from 'twin.macro'
import { Form } from 'ui/src/components/forms/_Form'

import { useNavigate } from 'react-router-dom'
import { login } from '../../api'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'

export default function Login_Auth_Page_Component() {
  const navigate = useNavigate()
  const login_ = useMutation({
    mutationFn: login,
  })

  return (
    <Form
      action={login_.mutateAsync}
      values={[]}
      required={['email', 'password']}
      then={ctx => {
        ctx.setStatus({ success: 'logged in' })

        navigate('/')
      }}
    >
      <div css={{ '&>*': tw`mb-3`, '&>*:last-child': tw`mb-0` }}>
        <Status />
        <EmailField name="email" />
        <PasswordField name="password" />
        <div tw="flex justify-center">
          <SubmitButton>Login</SubmitButton>
        </div>
      </div>
    </Form>
  )
}

import 'twin.macro'
import React from 'react'
import Status from 'ui/src/components/forms/Status'
import { EmailField, PasswordField } from 'ui/src/components/forms/TextField'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import tw from 'twin.macro'
import Form from '../facade/Form'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api'
import { useMutation } from '@tanstack/react-query'

export default function Login_Auth_Page_Component() {
  const login_ = useMutation({ mutationFn: login })
  const navigate = useNavigate()

  console.log(import.meta.env)
  console.log(import.meta.env.VITE_BACKEND_API)

  return (
    <Form
      action={login_}
      properties={['email', 'password']}
      required={['email', 'password']}
      onSuccess={(ret, ctx) => {
        ctx.setStatus({ success: 'signed in' })

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

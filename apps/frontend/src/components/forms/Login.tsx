import 'twin.macro'
import React from 'react'
import Status from 'ui/src/components/forms/Status'
import { EmailField, PasswordField } from 'ui/src/components/forms/TextField'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import tw from 'twin.macro'
import Form from '../facade/Form'
import { useLogin } from '@src/api/auth_queries'
import { useNavigate } from 'react-router-dom'

export default function Login_Auth_Page_Component() {
  const login = useLogin()
  const navigate = useNavigate()

  return (
    <Form
      action={login}
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

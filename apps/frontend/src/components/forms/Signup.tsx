import 'twin.macro'
import React from 'react'
import Form from '../facade/Form'

import {
  RoutesAuthLocalLogin,
  RoutesAuthLocalRegister,
} from 'types/dist/ts/routes'
import Status from 'ui/src/components/forms/Status'
import TextField, {
  EmailField,
  PasswordField,
} from 'ui/src/components/forms/TextField'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import tw from 'twin.macro'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { register } from '@src/api'

type Values = Partial<
  RoutesAuthLocalLogin &
    RoutesAuthLocalRegister & {
      confirmPassword: RoutesAuthLocalLogin['password']
    }
>

const initial = {
  email: undefined,
  username: undefined,
  password: undefined,
  confirmPassword: undefined,
} as Values

export default function SignIn_Auth_Page_Component() {
  // const register = useRegister()
  const register_ = useMutation({ mutationFn: register })
  const navigate = useNavigate()

  return (
    <Form
      properties={Object.keys(initial)}
      required={['email', 'password', 'confirmPassword']}
      action={register_}
      validate={(values: any) => {
        if (values.password !== values.confirmPassword)
          return { confirmPassword: 'passwords do not match' }
      }}
      onSuccess={(ret, ctx) => {
        ctx.setStatus({ success: 'signed in' })
        navigate('/')
      }}
    >
      <div css={{ '&>*': tw`mb-3`, '&>*:last-child': tw`mb-0` }}>
        <Status />
        <EmailField name="email" />
        <TextField name="username" />
        <PasswordField name="password" />
        <PasswordField name="confirmPassword" />
        <div tw="flex justify-center">
          <SubmitButton>Login</SubmitButton>
        </div>
      </div>
    </Form>
  )
}

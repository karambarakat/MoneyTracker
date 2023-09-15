import React from 'react'
import 'twin.macro'
import { profile, token } from '../utils/localStorage'
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import Text from 'ui/src/components/Text'
import { WithAsChild } from 'ui/src/utils/WithChildren'

import Brand from '../components/Brand'
import tw from 'twin.macro'
import SecretField from 'ui/src/components/forms/SecretField'
import EmailField from 'ui/src/components/forms/EmailField'
import { useMutation } from '@tanstack/react-query'
import { login, register } from '../api/mutations'
import { Form, FormBody } from 'ui/src/components/forms/_Form'

import { Slot } from '@radix-ui/react-slot'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { ILink } from '../lib/react-router-dom'
import Status from 'ui/src/components/forms/Status'
import TextField from 'ui/src/components/forms/TextField'
import { User } from 'types/gql/graphql'

export function Authentication() {
  return (
    <div>
      <div
        tw="grid space-y-8 my-10 mx-auto max-w-[350px]"
        css={{ '& > *': tw`!mx-auto` }}
      >
        <Brand />
        <Routes>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<Navigate to="./register" />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export function Protected() {
  const location = useLocation()
  const _token = token.use()

  if (!_token.getItem()) {
    return <Navigate to={'/auth'} state={{ goBackTo: location.pathname }} />
  }

  return <Outlet />
}

function _Card(p: WithAsChild) {
  const Component = p.asChild ? Slot : 'div'

  return (
    <Component tw="w-full border border-solid border-gray-300 dark:border-gray-400/30 shadow-sm p-4 rounded">
      {p.children}
    </Component>
  )
}

function useGoBack() {
  const location = useLocation()
  const navigate = useNavigate()

  return (profile_: User) => {
    profile.setItem(profile_)
    navigate(location.state?.goBackTo ?? '/')
  }
}

function LogIn() {
  const navigate = useGoBack()

  const action = useMutation({
    mutationFn: login,
    onSuccess: data => navigate(data),
  })

  return (
    <>
      <_Card>
        <Form
          required={['email', 'password']}
          values={[]}
          action={action.mutateAsync}
        >
          <FormBody>
            <Text size="subtle" tw="text-center">
              Log into your account
            </Text>
            <Status onSuccess="Logged in" />
            <EmailField name="email" title="Email" />
            <SecretField name="password" />
            <SubmitButton>Login</SubmitButton>
          </FormBody>
        </Form>
      </_Card>
      <ILink to="../register">Create an account</ILink>
    </>
  )
}

function Register() {
  const navigate = useGoBack()
  const action = useMutation({
    mutationFn: register,
    onSuccess: data => navigate(data),
  })

  return (
    <>
      <_Card>
        <Form
          required={['email', 'password', 'confirmPassword']}
          validate={vals => {
            if (vals.password !== vals.confirmPassword) {
              return { confirmPassword: 'Passwords do not match' }
            }
          }}
          action={async ({
            confirmPassword,
            ...param
          }: Parameters<typeof register>[0] & { confirmPassword: string }) => {
            return await action.mutateAsync(param)
          }}
        >
          <FormBody>
            <Text size="subtle" tw="text-center">
              Register New Account
            </Text>
            <Status onSuccess="Registered" />
            <TextField name="display_name" title="Display Name" />
            <EmailField name="email" title="Email" />
            <SecretField name="password" />
            <SecretField name="confirmPassword" title="Confirm The Password" />

            <SubmitButton>Register</SubmitButton>
          </FormBody>
        </Form>
      </_Card>
      <span>
        Have an existing account? <ILink to="../login">Log in</ILink>
      </span>
    </>
  )
}

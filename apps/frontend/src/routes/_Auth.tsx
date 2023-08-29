import React from 'react'
import 'twin.macro'
import { Token, setProfile, useProfile } from '../utils/localProfile'
import {
  Navigate,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
} from 'react-router-dom'
import Text from 'ui/src/components/Text'
import { WithAsChild } from 'ui/src/utils/WithChildren'

import Brand from '../components/Brand'
import tw from 'twin.macro'
import { SchemaProfile } from 'types/dist/ts/schema'
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
import { Jwt } from 'types/dist/ts/api'

export function Protected() {
  const profile = useProfile()
  const location = useLocation()

  if (!profile || Token(profile.token).expired()) {
    return <Navigate to={'/auth'} state={{ goBackTo: location.pathname }} />
  }

  return <Outlet />
}

export function Authentication() {
  const match = useMatch('/auth/*')

  match?.params['*'] === ''

  if (!match) {
    throw new Error('No match')
  }

  const subPage: '' | 'register' = match.params['*'] as any

  return (
    <div
      tw="grid space-y-8 my-10 mx-auto max-w-[350px]"
      css={{ '& > *': tw`!mx-auto` }}
    >
      <Brand />
      <_Card>{subPage === 'register' ? <Register /> : <LogIn />}</_Card>
      {subPage === 'register' ? (
        <span>
          Have an existing account? <ILink to="../">Log in</ILink>
        </span>
      ) : (
        <ILink to="./register">Create an account</ILink>
      )}
    </div>
  )
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

  return (profile: SchemaProfile) => {
    setProfile(profile)
    const to = location.state?.goBackTo ?? '/'
    navigate(to)
  }
}

function LogIn() {
  const goBack = useGoBack()
  const action = useMutation({
    mutationFn: login,
    onSuccess: goBack,
  })

  return (
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
  )
}

function Register() {
  const goBack = useGoBack()
  const action = useMutation({
    mutationFn: register,
    onSuccess: goBack,
  })

  return (
    <Form
      required={['email', 'password']}
      validate={vals => {
        if (vals.password !== vals.confirmPassword) {
          return { confirmPassword: 'Passwords do not match' }
        }
      }}
      action={async ({
        confirmPassword,
        ...param
      }: Parameters<typeof register>[0] & { confirmPassword: string }) => {
        action.mutateAsync(param)
      }}
    >
      <FormBody>
        <Text size="subtle" tw="text-center">
          Register New Account
        </Text>
        <Status onSuccess="Registered" />
        <TextField name="displayName" title="Display Name" />
        <EmailField name="email" title="Email" />
        <SecretField name="password" />
        <SecretField name="confirmPassword" title="Confirm The Password" />

        <SubmitButton>Register</SubmitButton>
      </FormBody>
    </Form>
  )
}

import React from 'react'
import 'twin.macro'
import { useProfile } from '../utils/localProfile'
import { Link, Navigate, Outlet, useLocation, useMatch } from 'react-router-dom'
import Text from 'ui/src/components/Text'
import { WithAsChild, WithChildren } from 'ui/src/utils/WithChildren'
import Signup from '../components/forms/Signup'
import Login from '../components/forms/Login'

import Brand from '../components/Brand'
import tw from 'twin.macro'
import { SchemaProfile } from 'types/dist/ts/schema'
import TextField, {
  EmailField,
  PasswordField,
} from 'ui/src/components/forms/TextField'
import { useMutation } from '@tanstack/react-query'
import { login } from '../api'
import { useFormik } from 'formik'
import Form from 'ui/src/components/forms/Form'
import { Slot } from '@radix-ui/react-slot'
import SubmitButton from 'ui/src/components/forms/SubmitButton'
import { ILink } from '../lib/react-router-dom'

export function Protected() {
  const profile = useProfile()
  const location = useLocation()

  if (!profile || Token(profile.token).expired()) {
    return <Navigate to={'/auth'} state={{ goBackTo: location.pathname }} />
  }

  return (
    <>
      <Outlet />
    </>
  )
}

class Token_ {
  constructor(public token: string) {
    this.token = token
  }
  expired() {
    return true
  }
}

function Token(token: string) {
  return new Token_(token)
}

function _Card(p: WithAsChild) {
  const Component = p.asChild ? Slot : 'div'

  return (
    <Component tw="w-full border border-solid border-gray-300 dark:border-gray-400/30 shadow-sm p-4 rounded">
      {p.children}
    </Component>
  )
}

export function Authentication() {
  const match = useMatch('/auth/*')

  const profile = useProfile()

  const login_action = useMutation({ mutationFn: login })

  return (
    <div
      tw="grid space-y-8 my-10 mx-auto max-w-[350px]"
      css={{ '& > *': tw`!mx-auto` }}
    >
      <Brand />
      <_Card>
        {match?.params['*'] ? <></> : <></>}
        <Form values={[]} action={login_action.mutateAsync}>
          <TextField name="email" title="Email" />
          <TextField name="password" />
          <SubmitButton />
        </Form>
      </_Card>
      <div tw="flex gap-2">
        <span>
          <ILink to={'./reset_password'}>Can't log in?</ILink>
        </span>
        <span>•</span>
        <span>
          <ILink to="./signup">Create an account</ILink>
        </span>
        {/* Don't have an account? <Link to={'./signup'}>Sign Up</Link>{' '} */}
      </div>
    </div>
  )
}

function SessionExpired({ profile }: { profile: SchemaProfile }) {
  return (
    <>
      <Text tw="text-center text-2xl">Welcome back, {profile.displayName}</Text>
    </>
  )
}

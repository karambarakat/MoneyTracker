import React from 'react'
import 'twin.macro'
import { useProfile } from '../utils/localProfile'
import { Link, Navigate, Outlet, useLocation, useMatch } from 'react-router-dom'
import Text from 'ui/src/components/Text'
import { WithChildren } from 'ui/src/utils/WithChildren'
import Signup from '../components/forms/Signup'
import Login from '../components/forms/Login'

import Brand from '../components/Brand'
import tw from 'twin.macro'
import { SchemaProfile } from 'types/dist/ts/schema'
import { EmailField, PasswordField } from 'ui/src/components/forms/TextField'
import { useMutation } from '@tanstack/react-query'
import { login } from '../api'
import { useFormik } from 'formik'
import Form from 'ui/src/components/forms/Form'

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

export function Authentication() {
  useMatch('/auth')
  const profile = useProfile()

  const login_action = useMutation({ mutationFn: login })

  // useFormik()

  return (
    <div
      tw="grid space-y-8 my-10 mx-auto max-w-[400px]"
      css={{ '& > *': tw`!mx-auto` }}
    >
      <Brand />
      <div tw="w-full border border-solid border-gray-300 p-4 rounded">
        <Form action={login_action.mutateAsync} values={['email', 'password']}>
          <EmailField name="email" />
          <PasswordField name="password" />
        </Form>
      </div>
      <div tw="gap-2">
        Don't have an account? <Link to={'./signup'}>Sign Up</Link>{' '}
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

import React from 'react'
import 'twin.macro'
import { useProfile } from '../utils/localProfile'
import { Link, Navigate, Outlet } from 'react-router-dom'
import Text from 'ui/src/components/Text'
import { WithChildren } from 'ui/src/utils/WithChildren'
import Signup from '../components/forms/Signup'
import Login from '../components/forms/Login'

import Brand from '../components/Brand'
import tw from 'twin.macro'
import { SchemaProfile } from 'types/dist/ts/schema'
import { useEmailStatus } from '../api/auth_queries'
import { EmailField } from 'ui/src/components/forms/TextField'
import { Formik } from 'formik'

export function Protected() {
  const profile = useProfile()

  if (!profile) return <Navigate to={'/auth/login'} state={{ goBackTo: '' }} />

  return (
    <>
      <Outlet />
    </>
  )
}

export function Authentication() {
  const profile = useProfile()

  return (
    <div
      tw="grid space-y-8 my-10 mx-auto max-w-[400px]"
      css={{ '& > *': tw`!mx-auto` }}
    >
      <Brand />
      <div tw="w-full border border-solid border-gray-300 p-4 rounded">
        {profile && <SessionExpired profile={profile} />}
      </div>
      {/* <Formik initialValues={{email: undefined} as {email?: string}} onSubmit={(vals) => { */}
      // useEmailStatus.mutateAsync(vals.email)
      {/* }} > */}
      {/* <EmailField name='email' /> */}
      {/* </Formik> */}
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

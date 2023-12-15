import 'twin.macro'
import { Fragment } from 'react'
import { setTitle } from './_MetaContext'
import Button from 'ui/src/components/Button'
import tw from 'twin.macro'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { mutations, queries, queryKeys } from '../api'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { FormRoot } from '../components/_FormUtils'
import TextField from 'ui/src/components/forms/TextField'
import Text from 'ui/src/components/Text'
import { MutationUpdatePasswordArgs, UserInput } from 'types/gql/graphql'
import SecretField from 'ui/src/components/forms/SecretField'
import Status from 'ui/src/components/forms/Status'

function Root() {
  const nav = useNavigate()
  const location = useLocation()

  const { data } = useQuery({
    queryFn: () => queries.profile(),
    queryKey: ['profile'] satisfies queryKeys,
  })

  return (
    <div tw="flex flex-col gap-3">
      {data ? (
        <Fragment>
          <div>Name: {data.displayName}</div>
          <div>Email: {data.email}</div>
        </Fragment>
      ) : (
        <div>error</div>
      )}
      <div tw="flex gap-3">
        <Button asChild>
          <button onClick={() => nav('./resetPassword')}>Reset Password</button>
        </Button>

        <Button asChild>
          <button onClick={() => nav('updateProfile')}>Update Profile</button>
        </Button>
      </div>

      {location.pathname.endsWith('resetPassword') && <ResetPassword />}
      {location.pathname.endsWith('updateProfile') && <UpdateProfile />}
    </div>
  )
}

function UpdateProfile() {
  const client = useQueryClient()
  const action = useMutation({
    mutationFn: (user: UserInput) => mutations.update_profile({ user }),
    onSuccess: () => {
      mutations.update_profile.shouldInvalidate(client)
    },
  })
  const nav = useNavigate()
  return (
    <FormRoot
      required={['displayName']}
      values={{ displayName: '' }}
      action={action.mutateAsync}
      then={ctx => {
        ctx.setStatus({ success: 'Profile Updated' })
        ctx.setValues({ displayName: '' })
        nav('../')
      }}
      asChild
    >
      <div tw="p-4 border-none flex flex-col gap-2">
        <Status />
        <Text>Update Display Name</Text>
        <TextField name="displayName" />
        <div tw="mt-4 flex justify-end">
          <Button>Update</Button>
        </div>
      </div>
    </FormRoot>
  )
}

function ResetPassword() {
  const action = useMutation({
    mutationFn: ({ password }: MutationUpdatePasswordArgs) =>
      mutations.set_password({ password }),
  })

  const nav = useNavigate()
  return (
    <FormRoot
      required={['password']}
      values={{} as MutationUpdatePasswordArgs}
      action={action.mutateAsync}
      then={ctx => {
        ctx.setStatus({ success: 'Profile Updated' })
        ctx.setValues({ password: '' })
        nav('../')
      }}
      asChild
    >
      <div tw="p-4 border-none flex flex-col gap-2">
        <Status />
        <Text>Reset Password</Text>
        <SecretField
          autoComplete="new-password"
          title="New Password"
          name="password"
        />
        <div tw="mt-4 flex justify-end">
          <Button type="submit">Update</Button>
        </div>
      </div>
    </FormRoot>
  )
}

function Profile_Page_Component() {
  setTitle('Profile')

  return (
    <div id="page" css={{ '&>*': tw`mt-4` }}>
      <Routes>
        <Route path="*" element={<Root />} />
      </Routes>
    </div>
  )
}

export default Profile_Page_Component

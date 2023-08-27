import { afterAll, beforeAll, expect, it } from '@jest/globals'
import { fetchQql, gql } from '../utils/gql'
import fetch from 'node-fetch'
import { HELPER_SERVER, REST_API } from '../utils/constants'
import { profileGQL } from '../utils/expect'
import {
  Query,
  Mutation,
  MutationUpdateCurrentUserArgs,
  MutationUpdatePasswordArgs,
} from '../gql/graphql'

const ctx: any = {
  ids: [],
  credential: 'testing_profile@m.c:pass',
}

beforeAll(async () => {
  const res = await fetch(REST_API + '/auth/local/register', {
    method: 'POST',
    headers: {
      content: 'application/json',
      authorization: 'Basic ' + Buffer.from(ctx.credential).toString('base64'),
    },
    body: JSON.stringify({}),
  })
  const json: any = await res.json()
  ctx.user = Object.assign({}, json)
  ctx.ids.push(json.id)
  ctx.user.token = res.headers.get('x-token')
  ctx.user.headers = {
    authorization: 'Bearer ' + ctx.user.token,
  }
})

it('get_current_profile', async () => {
  const input = gql`
    query get_current_profile {
      getCurrentUser { ${gql.profile} }
    }
  `

  const data = await fetchQql<{ getCurrentUser: Query['getOneCategory'] }>(
    ctx.user.headers,
    input.input,
  )

  expect(data.getCurrentUser).toMatchSnapshot(profileGQL)
  expect(input.input).toMatchSnapshot()
})

it('update_current_user', async () => {
  const input = gql`
    mutation update_current_user($user: UserInput!) {
      updateCurrentUser(user: $user) { ${gql.profile} }
    }
  `

  const vars = {
    user: {
      displayName: 'new_display_name',
      avatar: 'new avatar',
    },
  } satisfies MutationUpdateCurrentUserArgs

  const data = await fetchQql<
    {
      updateCurrentUser: Mutation['updateCurrentUser']
    },
    MutationUpdateCurrentUserArgs
  >(ctx.user.headers, input.input, vars)

  expect(vars).toMatchSnapshot()
  expect(data.updateCurrentUser).toMatchSnapshot(profileGQL)
  expect(input.input).toMatchSnapshot()
})

it('update_password', async () => {
  const input = gql`
    mutation update_password($password: String!) {
      updatePassword(password: $password)
    }
  `

  const vars = {
    password: 'new_password',
  } satisfies MutationUpdatePasswordArgs

  const data = await fetchQql<
    {
      updatePassword: Mutation['updatePassword']
    },
    MutationUpdatePasswordArgs
  >(ctx.user.headers, input.input, vars)

  expect(data.updatePassword).toMatchSnapshot()
  expect(input.input).toMatchSnapshot()

  const tryLogin = await fetch(REST_API + '/auth/local/login', {
    method: 'POST',
    headers: {
      content: 'application/json',
      authorization: 'Basic ' + Buffer.from(ctx.credential).toString('base64'),
    },
    body: JSON.stringify({}),
  })

  expect(tryLogin.status).toBe(401)

  const login = await fetch(REST_API + '/auth/local/login', {
    method: 'POST',
    headers: {
      content: 'application/json',
      authorization:
        'Basic ' +
        Buffer.from('testing_profile@m.c:new_password').toString('base64'),
    },
    body: JSON.stringify({}),
  })

  expect(login.status).toBe(200)
})

afterAll(async () => {
  await Promise.all(
    ctx.ids.map((id: string) =>
      fetch(HELPER_SERVER + '/remove_user_data/' + id),
    ),
  )
})

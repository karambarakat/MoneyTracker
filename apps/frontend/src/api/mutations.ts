/* eslint-disable no-empty-pattern */
import * as queries from './queries'
import { UserRestResponse, BasicToken, RegisterUserBody } from 'types/backend'
import { GraphqlError, RestError } from 'types/HttpError'
import {
  Mutation,
  MutationCreateOneCategoryArgs,
  MutationCreateOneEntryArgs,
  MutationDeleteOneCategoryArgs,
  MutationDeleteOneEntryArgs,
  MutationUpdateCurrentUserArgs,
  MutationUpdateOneCategoryArgs,
  MutationUpdateOneEntryArgs,
  MutationUpdatePasswordArgs,
  User,
} from 'types/gql/graphql'
import { token } from '../utils/localStorage'

export const user = 'id email displayName avatar providers createdAt updatedAt'
export const category = `id title color createdAt updatedAt createdBy { ${user} }`
export const entry = `id title amount note createdAt updatedAt createdBy { ${user} } category { ${category} }`

export const create_entry = async (_input: MutationCreateOneEntryArgs) => {
  const res = await gql(
    `mutation mutate($entry: EntryInput!) {
      createOneEntry(entry: $entry) {
        ${entry}
      }
    }`,
    { entry: _input.entry },
  )

  return (await handler(res)).createOneEntry as Mutation['createOneEntry']
}

create_entry.shouldInvalidate = ['find_log'] as const satisfies Readonly<
  (keyof typeof queries)[]
>

export const update_entry = async ({
  entry,
  id,
}: MutationUpdateOneEntryArgs) => {
  const res = await gql(
    `mutation mutate($entry: EntryInput!, $id: ID!) {
      updateOneEntry(entry: $entry, id: $id) 
    }`,
    { entry, id },
  )

  return (await handler(res)).updateOneEntry as Mutation['updateOneEntry']
}

export const delete_entry = async ({ id }: MutationDeleteOneEntryArgs) => {
  const res = await gql(
    `mutation mutate($id: ID!) {
      deleteOneEntry(idMutationDeleteOneEntryArgs: $id)
    }`,
    { id },
  )

  return (await handler(res)).deleteOneEntry as Mutation['deleteOneEntry']
}

delete_entry.shouldInvalidate = [
  'find_log',
  'find_one_log',
] as const satisfies Readonly<(keyof typeof queries)[]>

export const create_category = async ({
  category,
}: MutationCreateOneCategoryArgs) => {
  const res = await gql(
    `mutation mutate($category: CategoryInput!) {
      createOneCategory(category: $category) {
        ${category}
      }
    }`,
    { category },
  )

  return (await handler(res)).createOneCategory as Mutation['createOneCategory']
}

create_category.shouldInvalidate = [
  'find_category',
] as const satisfies Readonly<(keyof typeof queries)[]>

export const update_category = async ({
  category,
  id,
}: MutationUpdateOneCategoryArgs) => {
  const res = await gql(
    `mutation mutate($category: CategoryInput!, $id: ID!) {
      updateOneCategory(category: $category, id: $id) 
    }`,
    { category, id },
  )

  return (await handler(res)).updateOneCategory as Mutation['updateOneCategory']
}

update_category.shouldInvalidate = [
  'find_category',
  'find_one_category',
] as const satisfies Readonly<(keyof typeof queries)[]>

export const delete_category = async ({
  id,
}: MutationDeleteOneCategoryArgs) => {
  const res = await gql(
    `mutation mutate($id: ID!) {
      deleteOneCategory(id: $id)
    }`,
    { id },
  )

  return (await handler(res)).deleteOneCategory as Mutation['deleteOneCategory']
}

delete_category.shouldInvalidate = [
  'find_category',
  'find_one_category',
] as const satisfies Readonly<(keyof typeof queries)[]>

export const register = async (
  { email, password, ...body }: BasicToken & RegisterUserBody,
  // body: RegisterUserBody,
) => {
  if ('displayName' in body) throw new Error('updated the backend ?')

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/auth/local/register`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${email}:${password}`)}`,
      },
    },
  )
  return _hack((await handler(res)) as UserRestResponse)
}

export const login = async ({ email, password }: BasicToken) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/auth/local/login`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${email}:${password}`)}`,
      },
    },
  )
  return _hack((await handler(res)) as UserRestResponse)
}

import { DateTime } from 'luxon'

// graphql does some transformation that actix-web does not
// this is a hack to unify the two
// todo: refactor the backend
function _hack(user: UserRestResponse) {
  return {
    ...user,
    createdAt: DateTime.fromMillis(user.created_at).toISO(),
    displayName: user.display_name,
    updatedAt: DateTime.fromMillis(user.updated_at).toISO(),
  } as User
}
export const update_profile = async ({
  user,
}: MutationUpdateCurrentUserArgs) => {
  const res = await gql(
    `mutation mutate($user: UserInput!) {
      updateCurrentUser(user: $user) {
        ${user}
      }
    }`,
    { user },
  )

  return (await handler(res)).updateCurrentUser as Mutation['updateCurrentUser']
}

export const set_password = async ({
  password,
}: MutationUpdatePasswordArgs) => {
  const res = await gql(
    `mutation mutate($password: String!) {
      updatePassword(password: $password)
    }`,
    { password },
  )

  return (await handler(res)).updatePassword as Mutation['updatePassword']
}

// helpers

export async function handler(res: Response) {
  if (!res.headers.get('content-type')?.includes('application/json')) {
    throw new Error('Response is not JSON')
  }

  const token_ = res.headers.get('X-Token')
  token_
    ? token.setItem(token_)
    : console.warn(
        'api should always return token on successful requests',
        res.headers.forEach(console.warn),
      )
  const json = await res.json()

  if (String(res.status).startsWith('4') && 'error' in json) {
    throw new RestError(json.error)
  }

  if ('data' in json) {
    return json.data
  }

  if ('errors' in json && json.data === null) {
    throw new GraphqlError(json.errors)
  }

  throw new Error('Response is not JSON')
}

export function gql(query: string, variables?: object) {
  return fetch(`${import.meta.env.VITE_BACKEND_URL}/graphql`, {
    method: 'POST',
    body: JSON.stringify({ query, variables }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.getItem()}`,
    },
  })
}

/* eslint-disable no-empty-pattern */
import * as queries from './queries'
import { UserRestResponse, BasicToken, RegisterUserBody } from 'types/backend'
import { GraphqlError, RestError } from 'types/HttpError'
import {
  Mutation,
  MutationCreateOneEntryArgs,
  MutationDeleteOneCategoryArgs,
  MutationUpdateCurrentUserArgs,
  MutationUpdateOneCategoryArgs,
  MutationUpdatePasswordArgs,
} from 'types/gql/graphql'
import { getProfile } from '../utils/localProfile'

export const user = 'id email displayName avatar providers createdAt updatedAt'
export const category = `id title color createdAt updatedAt createdBy { ${user} }`
export const entry = `id title amount note createdAt updatedAt createdBy { ${user} } category { ${category} }`

export const create_log = async (_input: MutationCreateOneEntryArgs) => {
  const res = await gql(
    `mutation mutate($entry: EntryInput!) {
      createOneEntry(entry: $entry) {
        ${entry}
      }
    }`,
    { entry: _input.entry },
  )

  return (await handler(res)) as Mutation['createOneEntry']
}

create_log.shouldInvalidate = ['find_log'] as const satisfies Readonly<
  (keyof typeof queries)[]
>

export const update_log = async ({
  category,
  id,
}: MutationUpdateOneCategoryArgs) => {
  const res = await gql(
    `mutation mutate($category: CategoryInput!, $id: ID!) {
      updateOneCategory(category: $category, id: $id) 
    }`,
    { category, id },
  )

  return (await handler(res)) as Mutation['updateOneCategory']
}

export const delete_log = async ({ id }: MutationDeleteOneCategoryArgs) => {
  const res = await gql(
    `mutation mutate($id: ID!) {
      deleteOneCategory(id: $id)
    }`,
    { id },
  )

  return (await handler(res)) as Mutation['deleteOneCategory']
}

delete_log.shouldInvalidate = [
  'find_log',
  'find_one_log',
] as const satisfies Readonly<(keyof typeof queries)[]>

export const create_category = async (_input: MutationCreateOneEntryArgs) => {
  const res = await gql(
    `mutation mutate($entry: EntryInput!) {
      createOneEntry(entry: $entry) {
        ${entry}
      }
    }`,
    { entry: _input.entry },
  )

  return (await handler(res)) as Mutation['createOneEntry']
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

  return (await handler(res)) as Mutation['updateOneCategory']
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

  return (await handler(res)) as Mutation['deleteOneCategory']
}

delete_category.shouldInvalidate = [
  'find_category',
  'find_one_category',
] as const satisfies Readonly<(keyof typeof queries)[]>

export const register = async (
  { email, password }: BasicToken,
  body: RegisterUserBody,
) => {
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
  return (await handler(res)) as UserRestResponse
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
  return (await handler(res)) as UserRestResponse
}

export const update_profile = async (_input: MutationUpdateCurrentUserArgs) => {
  const res = await gql(
    `mutation mutate($user: UserInput!) {
      updateCurrentUser(user: $user) {
        ${user}
      }
    }`,
    { user: _input.user },
  )

  return (await handler(res)) as Mutation['updateCurrentUser']
}

export const set_password = async (_input: MutationUpdatePasswordArgs) => {
  const res = await gql(
    `mutation mutate($password: String!) {
      updatePassword(password: $password)
    }`,
    { password: _input.password },
  )

  return (await handler(res)) as Mutation['updatePassword']
}

// helpers

export async function handler(res: Response) {
  if (!res.headers.get('content-type')?.includes('application/json')) {
    throw new Error('Response is not JSON')
  }

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
      Authorization: `Bearer ${getProfile()?.token}`,
    },
  })
}

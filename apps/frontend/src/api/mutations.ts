/* eslint-disable no-empty-pattern */
import * as queries from './queries'
import { UserRestResponse, BasicToken, RegisterUserBody } from 'types/backend'
import { GraphqlError, RestError } from 'types/HttpError'
import {
  CategoryFragment,
  EntryFragment,
  Mutation,
  MutationCreateOneCategoryArgs,
  MutationCreateOneEntryArgs,
  MutationDeleteOneCategoryArgs,
  MutationDeleteOneEntryArgs,
  MutationUpdateCurrentUserArgs,
  MutationUpdateOneCategoryArgs,
  MutationUpdateOneEntryArgs,
  MutationUpdatePasswordArgs,
  QueryGetAllEntriesArgs,
  User,
  UserFragment,
} from 'types/gql/graphql'
import { token } from '../utils/localStorage'
import { QueryClient } from '@tanstack/react-query'
import { Category, Entry, User as User_F } from 'types/fragments'

export const create_entry = async (_input: MutationCreateOneEntryArgs) => {
  const res = await gql(
    `mutation mutate($entry: EntryInput!) {
      createOneEntry(entry: $entry) {
        ...Entry
      }
    }
    ${Entry}
    `,
    { entry: _input.entry },
  )

  return (await handler(res)).createOneEntry as EntryFragment
}

create_entry.shouldInvalidate = (
  c: QueryClient,
  p: QueryGetAllEntriesArgs['pagination'],
) => {
  c.invalidateQueries(['find_log', p] satisfies queryKeys)
}

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

delete_entry.shouldInvalidate = (
  c: QueryClient,
  pagination: QueryGetAllEntriesArgs['pagination'],
  id: { id: string },
) => {
  c.invalidateQueries(['find_log', pagination] satisfies queryKeys)
  c.invalidateQueries(['find_one_log', id] satisfies queryKeys)
}

export const create_category = async ({
  category,
}: MutationCreateOneCategoryArgs) => {
  const res = await gql(
    `mutation mutate($category: CategoryInput!) {
      createOneCategory(category: $category) {
        ...Category
      }
    }
    ${Category}
    `,
    { category },
  )

  return (await handler(res)).createOneCategory as CategoryFragment
}

create_category.shouldInvalidate = (c: QueryClient) => {
  c.invalidateQueries(['find_category'] satisfies queryKeys)
}

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

update_category.shouldInvalidate = (c: QueryClient, id: { id: string }) => {
  c.invalidateQueries(['find_category'] satisfies queryKeys)
  c.invalidateQueries(['find_one_category', id] satisfies queryKeys)
}

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

delete_category.shouldInvalidate = (c: QueryClient, id: { id: string }) => {
  c.invalidateQueries(['find_category'] satisfies queryKeys)
  c.invalidateQueries(['find_one_category', id] satisfies queryKeys)
}

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
import { queryKeys } from '.'

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
        ...User
      }
    }
    ${User_F}
    `,
    { user },
  )

  return (await handler(res)).updateCurrentUser as UserFragment
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

  if ('errors' in json) {
    throw new GraphqlError(json.errors)
  }

  if ('data' in json) {
    return json.data
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

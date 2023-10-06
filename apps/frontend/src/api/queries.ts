import {
  CategoryFragment,
  EntryFragment,
  Query,
  QueryGetAllEntriesArgs,
  QueryGetOneCategoryArgs,
  QueryGetOneEntryArgs,
  UserFragment,
} from 'types/gql/graphql'
import { gql, handler } from './mutations'
import { Category, Entry, User } from 'types/fragments'

export const find_log = async (
  pagination: QueryGetAllEntriesArgs['pagination'],
) => {
  const res = await gql(
    `query query($pagination: PaginationRequest!) {
      getAllEntries(pagination: $pagination) {
        data { ...Entry }
        page
        pageSize
        total
        totalPages
      }
    }
    ${Entry}
    `,
    { pagination },
  )

  return (await handler(res)).getAllEntries as Omit<
    Query['getAllEntries'],
    'data'
  > & { data: EntryFragment[] }
}

export const find_one_log = async ({ id }: QueryGetOneEntryArgs) => {
  const res = await gql(
    `query query($id: ID!) {
      getOneEntry(id: $id) {
        ...Entry
      }
    }
    ${Entry}
    `,
    { id },
  )

  return (await handler(res)).getOneEntry as EntryFragment
}

export const find_category = async () => {
  const res = await gql(
    `query query {
      getAllCategories {
        ...Category
      }
    }
    ${Category}
    `,
    {},
  )

  return (await handler(res)).getAllCategories as CategoryFragment[]
}

export const find_one_category = async ({ id }: QueryGetOneCategoryArgs) => {
  const res = await gql(
    `query query($id: ID!) {
      getOneCategory(id: $id) {
        ...Category
      }
    }
    ${Category}
    `,
    { id },
  )

  return (await handler(res)).getOneCategory as CategoryFragment
}

export const profile = async () => {
  const res = await gql(
    `query query {
      getCurrentUser {
        ...User
      }
    }
    ${User}
    `,
    {},
  )

  return (await handler(res)).getCurrentUser as UserFragment
}

import {
  Query,
  QueryGetAllEntriesArgs,
  QueryGetOneCategoryArgs,
  QueryGetOneEntryArgs,
} from 'types/gql/graphql'
import { category, entry, gql, handler, user } from './mutations'

export const find_log = async (
  pagination: QueryGetAllEntriesArgs['pagination'],
) => {
  const res = await gql(
    `query query($pagination: PaginationRequest!) {
      getAllEntries(pagination: $pagination) {
        data { ${entry} }
        page
        pageSize
        total
        totalPages
      }
    }`,
    { pagination },
  )

  return (await handler(res)).getAllEntries as Query['getAllEntries']
}

export const find_one_log = async ({ id }: QueryGetOneEntryArgs) => {
  const res = await gql(
    `query query($id: ID!) {
      getOneEntry(id: $id) {
        ${entry}
      }
    }`,
    { id },
  )

  return (await handler(res)).getOneEntry as Query['getOneEntry']
}

export const find_category = async () => {
  const res = await gql(
    `query query {
      getAllCategories {
        ${category}
      }
    }`,
    {},
  )

  return (await handler(res)).getAllCategories as Query['getAllCategories']
}

export const find_one_category = async ({ id }: QueryGetOneCategoryArgs) => {
  const res = await gql(
    `query query($id: ID!) {
      getOneCategory(id: $id) {
        ${category}
      }
    }`,
    { id },
  )

  return (await handler(res)).getOneCategory as Query['getOneCategory']
}

export const profile = async () => {
  const res = await gql(
    `query query {
      getCurrentUser {
        ${user}
      }
    }`,
    {},
  )

  return (await handler(res)).getCurrentUser as Query['getCurrentUser']
}

import { afterAll, beforeAll, expect, it } from '@jest/globals'
import { fetchQql, gql } from '../utils/gql'
import fetch from 'node-fetch'
import { HELPER_SERVER, REST_API } from '../utils/constants'
import { categoryGQL, entryGQL, entryInput, entryNoCat } from '../utils/expect'
import {
  Mutation,
  MutationCreateManyEntriesArgs,
  Query,
  QueryGetAllEntriesArgs,
} from '../gql/graphql'
import { inspect } from 'util'

const ctx: any = {
  ids: [],
  credential: 'testing_pagination@m.c:pass',
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

afterAll(async () => {
  await Promise.all(
    ctx.ids.map((id: string) =>
      fetch(HELPER_SERVER + '/remove_user_data/' + id),
    ),
  )
})

it('create many entries', async () => {
  const input = gql`
    mutation create_many_entries($entries: [EntryInput!]!) {
      createManyEntries(entries: $entries) {
        id
        amount
        title
        createdAt
        updatedAt
      }
    }
  `

  const vars = {
    entries: Array.from({ length: 36 }).map((_, i) => ({
      title: `title ${i}`,
      amount: i * 1.3 + 1,
    })),
  } as MutationCreateManyEntriesArgs

  await fetchQql<
    {
      createManyEntries: Mutation['createManyEntries']
    },
    MutationCreateManyEntriesArgs
  >(ctx.user.headers, input.input, vars)

  const query = gql`
    query get_all_entries($pagination: PaginationRequest!) {
      getAllEntries(pagination: $pagination) {
        data {
          amount
          title
        }
        page
        pageSize
        total
        totalPages
      }
    }
  `

  const quick = async (page: number) => {
    return await fetchQql<
      {
        getAllEntries: Query['getAllEntries']
      },
      QueryGetAllEntriesArgs
    >(ctx.user.headers, query.input, {
      pagination: {
        page: page,
        pageSize: 10,
      },
    } satisfies QueryGetAllEntriesArgs)
  }

  const data2 = await quick(1)
  expect(data2.getAllEntries.data.length).toBe(10)
  const data3 = await quick(2)
  expect(data3.getAllEntries.data.length).toBe(10)
  const data4 = await quick(3)
  expect(data4.getAllEntries.data.length).toBe(10)
  const data5 = await quick(4)
  expect(data5.getAllEntries.data.length).toBe(6)

  expect({
    data2,
    data3,
    data4,
    data5,
  }).toMatchSnapshot()
})

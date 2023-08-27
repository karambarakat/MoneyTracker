import { afterAll, beforeAll, expect, it } from '@jest/globals'
import { fetchQql, gql } from '../utils/gql'
import fetch from 'node-fetch'
import { HELPER_SERVER, REST_API } from '../utils/constants'
import { categoryGQL, entryGQL, entryInput, entryNoCat } from '../utils/expect'
import {
  Query,
  Mutation,
  MutationCreateOneEntryArgs,
  MutationDeleteOneEntryArgs,
  MutationUpdateOneEntryArgs,
  MutationCreateManyEntriesArgs,
  MutationDeleteManyEntriesArgs,
  MutationCreateManyCategoriesArgs,
} from '../gql/graphql'

const ctx: any = {
  ids: [],
  credential: 'testing_category@m.c:pass',
  credential2: 'testing_category2@m.c:pass2',
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

  const res2 = await fetch(REST_API + '/auth/local/register', {
    method: 'POST',
    headers: {
      content: 'application/json',
      authorization: 'Basic ' + Buffer.from(ctx.credential2).toString('base64'),
    },
    body: JSON.stringify({}),
  })

  const json2: any = await res2.json()
  ctx.user2 = Object.assign({}, json2)
  ctx.ids.push(json2.id)
  ctx.user2.token = res2.headers.get('x-token')
  ctx.user2.headers = {
    authorization: 'Bearer ' + ctx.user2.token,
  }

  const input = gql`
    mutation create_many_categories($categories: [CategoryInput!]!) {
      createManyCategories(categories: $categories) { ${gql.category} }
    }
  `
  const vars = {
    categories: [
      {
        title: 'title1',
        icon: 'icon1',
        color: 'color1',
      },
      {
        title: 'title2',
        icon: 'icon2',
        color: 'color2',
      },
    ],
  } satisfies MutationCreateManyCategoriesArgs

  const data = await fetchQql<
    {
      createManyCategories: Mutation['createManyCategories']
    },
    MutationCreateManyCategoriesArgs
  >(ctx.user.headers, input.input, vars)

  ctx.category = data.createManyCategories[0]
  ctx.category2 = data.createManyCategories[1]
})

afterAll(async () => {
  await Promise.all(
    ctx.ids.map((id: string) =>
      fetch(HELPER_SERVER + '/remove_user_data/' + id),
    ),
  )
})

it('create_one_entry', async () => {
  const input = gql`
    mutation create_one_entry($entry: EntryInput!) {
      createOneEntry(entry: $entry) {
        ${gql.entry}
      }
    }
  `
  const vars = {
    entry: {
      title: 'title1',
      amount: 100,
      category: ctx.category.id,
    },
  } satisfies MutationCreateOneEntryArgs

  const data = await fetchQql<
    {
      createOneEntry: Mutation['createOneEntry']
    },
    MutationCreateOneEntryArgs
  >(ctx.user.headers, input.input, vars)

  ctx.entry = Object.assign({}, data.createOneEntry)
  ctx.entry.vars = Object.assign({}, vars.entry)

  expect(data.createOneEntry).toMatchSnapshot(entryGQL)
  expect(input.input).toMatchSnapshot()
  expect(vars.entry).toMatchSnapshot(entryInput)

  const var2 = {
    entry: {
      title: 'title2',
      amount: 200,
    },
  } satisfies MutationCreateOneEntryArgs

  const data2 = await fetchQql<
    {
      createOneEntry: Mutation['createOneEntry']
    },
    MutationCreateOneEntryArgs
  >(ctx.user.headers, input.input, var2)

  ctx.entry2 = Object.assign({}, data2.createOneEntry)
  ctx.entry2.vars = Object.assign({}, var2.entry)

  expect(data2.createOneEntry).toMatchSnapshot(entryNoCat)
  expect(var2.entry).toMatchSnapshot()
})

it('create_many_entries', async () => {
  const input = gql`
    mutation create_many_entries($entries: [EntryInput!]!) {
      createManyEntries(entries: $entries) {
        ${gql.entry}
      }
    }
  `
  const vars = {
    entries: [
      {
        title: 'title2',
        amount: 20.88,
        category: ctx.category.id,
      },
      {
        amount: -30,
        title: 'title3',
      },
    ],
  } satisfies MutationCreateManyEntriesArgs

  const data = await fetchQql<
    {
      createManyEntries: Mutation['createManyEntries']
    },
    MutationCreateManyEntriesArgs
  >(ctx.user.headers, input.input, vars)

  expect(data.createManyEntries.length).toBe(2)

  ctx.entry4 = Object.assign({}, data.createManyEntries[0])
  ctx.entry3 = Object.assign({}, data.createManyEntries[1])
  ctx.entry4.vars = Object.assign({}, vars.entries[0])
  ctx.entry3.vars = Object.assign({}, vars.entries[1])

  expect(vars.entries[0]).toMatchSnapshot(entryInput as any)
  expect(vars.entries[1]).toMatchSnapshot()
  expect(data.createManyEntries[0]).toMatchSnapshot(entryGQL)
  expect(data.createManyEntries[1]).toMatchSnapshot(entryNoCat)
  expect(input.input).toMatchSnapshot()
})

it('create results', async () => {
  const data = await fetchQql(
    ctx.user.headers,
    '{ getAllEntries { id title amount category { id } createdBy { id } } }',
  )

  expect(data.getAllEntries.length).toBe(4)
  expect(data.getAllEntries[0].id).toBe(ctx.entry.id)
  expect(data.getAllEntries[0].title).toBe(ctx.entry.vars.title)
  expect(Number(Number(data.getAllEntries[0].amount).toFixed(2))).toBe(
    ctx.entry.vars.amount,
  )
  expect(data.getAllEntries[0].category.id).toBe(ctx.entry.vars.category)
  expect(data.getAllEntries[0].createdBy.id).toBe(ctx.user.id)

  expect(data.getAllEntries[1].id).toBe(ctx.entry2.id)
  expect(data.getAllEntries[1].title).toBe(ctx.entry2.vars.title)
  expect(Number(Number(data.getAllEntries[1].amount).toFixed(2))).toBe(
    ctx.entry2.vars.amount,
  )
  expect(data.getAllEntries[1].category).toBe(null)
  expect(data.getAllEntries[1].createdBy.id).toBe(ctx.user.id)

  expect(data.getAllEntries[2].id).toBe(ctx.entry4.id)
  expect(data.getAllEntries[2].title).toBe(ctx.entry4.vars.title)
  expect(Number(Number(data.getAllEntries[2].amount).toFixed(2))).toBe(
    ctx.entry4.vars.amount,
  )
  expect(data.getAllEntries[2].category.id).toBe(ctx.entry4.vars.category)

  expect(data.getAllEntries[3].id).toBe(ctx.entry3.id)
  expect(data.getAllEntries[3].title).toBe(ctx.entry3.vars.title)
  expect(Number(Number(data.getAllEntries[3].amount).toFixed(2))).toBe(
    ctx.entry3.vars.amount,
  )
  expect(data.getAllEntries[3].category).toBe(null)
})

it('update_one_entry', async () => {
  const input = gql`
    mutation update_one_entry($id: ID!, $entry: EntryInput!) {
      updateOneEntry(id: $id, entry: $entry)
    }
  `
  const vars = {
    id: ctx.entry.id,
    entry: {
      title: 'new_title',
      amount: 1000,
      category: ctx.category2.id,
    },
  } satisfies MutationUpdateOneEntryArgs

  const data = await fetchQql<
    {
      updateOneEntry: Mutation['updateOneEntry']
    },
    MutationUpdateOneEntryArgs
  >(ctx.user.headers, input.input, vars)

  expect(data.updateOneEntry).toBe(true)
  expect(input.input).toMatchSnapshot()

  const data2 = await fetchQql(
    ctx.user.headers,
    `{ getOneEntry(id: "${ctx.entry.id}") { ${gql.entry} } }`,
  )

  expect(data2.getOneEntry).toMatchSnapshot(entryGQL)

  expect(data2.getOneEntry.title).toBe('new_title')
  expect(data2.getOneEntry.amount).toBe(1000)
  expect(data2.getOneEntry.category.id).toBe(ctx.category2.id)
})

it('delete_one_entry', async () => {
  const input = gql`
    mutation delete_one_entry($id: ID!) {
      deleteOneEntry(id: $id)
    }
  `
  const vars = {
    id: ctx.entry.id,
  } satisfies MutationDeleteOneEntryArgs

  const data = await fetchQql<
    {
      deleteOneEntry: Mutation['deleteOneEntry']
    },
    MutationDeleteOneEntryArgs
  >(ctx.user.headers, input.input, vars)

  expect(data.deleteOneEntry).toBe(true)

  const data2 = await fetchQql(ctx.user.headers, '{ getAllEntries { id } }')

  expect(data2.getAllEntries.length).toBe(3)
  expect(data2.getAllEntries[0].id).toBe(ctx.entry2.id)
  expect(data2.getAllEntries[1].id).toBe(ctx.entry4.id)
  expect(data2.getAllEntries[2].id).toBe(ctx.entry3.id)
})

it('delete_many_entries', async () => {
  const input = gql`
    mutation delete_many_entries($ids: [ID!]!) {
      deleteManyEntries(ids: $ids)
    }
  `
  const vars = {
    ids: [ctx.entry2.id, ctx.entry3.id],
  } satisfies MutationDeleteManyEntriesArgs

  const data = await fetchQql<
    {
      deleteManyEntries: Mutation['deleteManyEntries']
    },
    MutationDeleteManyEntriesArgs
  >(ctx.user.headers, input.input, vars)

  expect(data.deleteManyEntries).toBe(2)

  const data2 = await fetchQql(ctx.user.headers, '{ getAllEntries { id } }')

  expect(data2.getAllEntries.length).toBe(1)
  expect(data2.getAllEntries[0].id).toBe(ctx.entry4.id)
})

// it('create results', async () => {
//   const data = await fetchQql(
//     ctx.user.headers,
//     '{ getAllCategories { id title color icon createdBy { id } } }',
//   )

//   expect(data.getAllCategories.length).toBe(3)
//   expect(data.getAllCategories[1].id).toBe(ctx.cat2.id)
//   expect(data.getAllCategories[1].title).toBe(ctx.cat2.vars.title)
//   expect(data.getAllCategories[1].color).toBe(ctx.cat2.vars.color)
//   expect(data.getAllCategories[1].icon).toBe(ctx.cat2.vars.icon)
//   expect(data.getAllCategories[1].createdBy.id).toBe(ctx.user.id)

//   const data2 = await fetchQql(
//     ctx.user.headers,
//     `{ getOneCategory(id: "${ctx.cat1.id}") { ${gql.category} } }`,
//   )

//   expect(data2.getOneCategory).toMatchSnapshot(categoryGQL)

//   const data3 = await fetchQql(ctx.user2.headers, '{ getAllCategories { id } }')

//   expect(data3.getAllCategories.length).toBe(0)
// })

// it('update_one_category', async () => {
//   const input = gql`
//     mutation update_one_category($id: ID!, $category: CategoryInput!) {
//       updateOneCategory(id: $id, category: $category)
//     }
//   `
//   const vars = {
//     id: ctx.cat1.id,
//     category: {
//       title: 'new_title',
//       color: 'new_color',
//       icon: 'new_icon',
//     },
//   } satisfies MutationUpdateOneCategoryArgs

//   const data = await fetchQql<
//     {
//       updateOneCategory: Mutation['updateOneCategory']
//     },
//     MutationUpdateOneCategoryArgs
//   >(ctx.user.headers, input.input, vars)

//   expect(data.updateOneCategory).toBe(true)
//   expect(input.input).toMatchSnapshot()

//   const data2 = await fetchQql(
//     ctx.user.headers,
//     `{ getOneCategory(id: "${ctx.cat1.id}") { ${gql.category} } }`,
//   )

//   expect(data2.getOneCategory).toMatchSnapshot(categoryGQL)
//   expect(data2.getOneCategory.title).toBe('new_title')
//   expect(data2.getOneCategory.color).toBe('new_color')
//   expect(data2.getOneCategory.icon).toBe('new_icon')
// })

// it('delete_one_category', async () => {
//   const input = gql`
//     mutation delete_one_category($id: ID!) {
//       deleteOneCategory(id: $id)
//     }
//   `

//   const vars = {
//     id: ctx.cat1.id,
//   } satisfies MutationDeleteOneCategoryArgs

//   const data = await fetchQql<
//     {
//       deleteOneCategory: Mutation['deleteOneCategory']
//     },
//     MutationDeleteOneCategoryArgs
//   >(ctx.user.headers, input.input, vars)

//   expect(data.deleteOneCategory).toBe(true)

//   const data2 = await fetchQql(ctx.user.headers, '{ getAllCategories { id } }')

//   expect(data2.getAllCategories.length).toBe(2)
//   expect(data2.getAllCategories[0].id).toBe(ctx.cat2.id)
//   expect(data2.getAllCategories[1].id).toBe(ctx.cat3.id)
// })

// it('delete_many_categories', async () => {
//   const input = gql`
//     mutation delete_many_categories($ids: [ID!]!) {
//       deleteManyCategories(ids: $ids)
//     }
//   `

//   const vars = {
//     ids: [ctx.cat2.id, ctx.cat3.id],
//   } satisfies MutationDeleteManyCategoriesArgs

//   const data = await fetchQql<
//     {
//       deleteManyCategories: Mutation['deleteManyCategories']
//     },
//     MutationDeleteManyCategoriesArgs
//   >(ctx.user.headers, input.input, vars)

//   expect(data.deleteManyCategories).toBe(2)

//   const data2 = await fetchQql(ctx.user.headers, '{ getAllCategories { id } }')

//   expect(data2.getAllCategories.length).toBe(0)
// })

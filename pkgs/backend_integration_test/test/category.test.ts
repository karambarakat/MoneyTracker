import { afterAll, beforeAll, expect, it } from '@jest/globals'
import { fetchQql, gql } from '../utils/gql'
import fetch from 'node-fetch'
import { HELPER_SERVER, REST_API } from '../utils/constants'
import { categoryGQL } from '../utils/expect'
import {
  Query,
  Mutation,
  MutationCreateOneCategoryArgs,
  MutationCreateManyCategoriesArgs,
  MutationDeleteOneCategoryArgs,
  MutationDeleteManyCategoriesArgs,
  MutationUpdateOneCategoryArgs,
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
})

afterAll(async () => {
  await Promise.all(
    ctx.ids.map((id: string) =>
      fetch(HELPER_SERVER + '/remove_user_data/' + id),
    ),
  )
})

it('create_one_category', async () => {
  const input = gql`
    mutation create_one_category($category: CategoryInput!) {
      createOneCategory(category: $category) { ${gql.category} }
    }
  `

  const vars = {
    category: {
      title: 'new_category',
    },
  } satisfies MutationCreateOneCategoryArgs

  const data = await fetchQql<
    {
      createOneCategory: Mutation['createOneCategory']
    },
    MutationCreateOneCategoryArgs
  >(ctx.user.headers, input.input, vars)

  ctx.cat1 = data.createOneCategory
  ctx.cat1.vars = vars.category

  expect(data.createOneCategory).toMatchSnapshot(categoryGQL)
  expect(input.input).toMatchSnapshot()
})

it('create_many_categories', async () => {
  const input = gql`
    mutation create_many_categories($categories: [CategoryInput!]!) {
      createManyCategories(categories: $categories) { ${gql.category} }
    }
  `

  const vars = {
    categories: [
      {
        title: 'new_category2',
        color: 'red',
        icon: 'icon',
      },
      {
        title: 'new_category3',
        color: 'blue',
        icon: 'icon_2',
      },
    ],
  } satisfies MutationCreateManyCategoriesArgs

  const data = await fetchQql<
    {
      createManyCategories: Mutation['createManyCategories']
    },
    MutationCreateManyCategoriesArgs
  >(ctx.user.headers, input.input, vars)

  expect(data.createManyCategories.length).toBe(2)

  ctx.cat2 = data.createManyCategories[0]
  ctx.cat3 = data.createManyCategories[1]
  ctx.cat2.vars = vars.categories[0]
  ctx.cat3.vars = vars.categories[1]

  expect(data.createManyCategories[0]).toMatchSnapshot(categoryGQL)
  expect(input.input).toMatchSnapshot()

  const data2 = await fetchQql(ctx.user.headers, '{ getAllCategories { id } }')

  expect(data2.getAllCategories.length).toBe(3)
  expect(data2.getAllCategories[0].id).toBe(ctx.cat1.id)
  expect(data2.getAllCategories[1].id).toBe(ctx.cat2.id)
  expect(data2.getAllCategories[2].id).toBe(ctx.cat3.id)
})

it('create results', async () => {
  const data = await fetchQql(
    ctx.user.headers,
    '{ getAllCategories { id title color icon createdBy { id } } }',
  )

  expect(data.getAllCategories.length).toBe(3)
  expect(data.getAllCategories[1].id).toBe(ctx.cat2.id)
  expect(data.getAllCategories[1].title).toBe(ctx.cat2.vars.title)
  expect(data.getAllCategories[1].color).toBe(ctx.cat2.vars.color)
  expect(data.getAllCategories[1].icon).toBe(ctx.cat2.vars.icon)
  expect(data.getAllCategories[1].createdBy.id).toBe(ctx.user.id)

  const data2 = await fetchQql(
    ctx.user.headers,
    `{ getOneCategory(id: "${ctx.cat1.id}") { ${gql.category} } }`,
  )

  expect(data2.getOneCategory).toMatchSnapshot(categoryGQL)

  const data3 = await fetchQql(ctx.user2.headers, '{ getAllCategories { id } }')

  expect(data3.getAllCategories.length).toBe(0)
})

it('update_one_category', async () => {
  const input = gql`
    mutation update_one_category($id: ID!, $category: CategoryInput!) {
      updateOneCategory(id: $id, category: $category)
    }
  `
  const vars = {
    id: ctx.cat1.id,
    category: {
      title: 'new_title',
      color: 'new_color',
      icon: 'new_icon',
    },
  } satisfies MutationUpdateOneCategoryArgs

  const data = await fetchQql<
    {
      updateOneCategory: Mutation['updateOneCategory']
    },
    MutationUpdateOneCategoryArgs
  >(ctx.user.headers, input.input, vars)

  expect(data.updateOneCategory).toBe(true)
  expect(input.input).toMatchSnapshot()

  const data2 = await fetchQql(
    ctx.user.headers,
    `{ getOneCategory(id: "${ctx.cat1.id}") { ${gql.category} } }`,
  )

  expect(data2.getOneCategory).toMatchSnapshot(categoryGQL)
  expect(data2.getOneCategory.title).toBe('new_title')
  expect(data2.getOneCategory.color).toBe('new_color')
  expect(data2.getOneCategory.icon).toBe('new_icon')
})

it('delete_one_category', async () => {
  const input = gql`
    mutation delete_one_category($id: ID!) {
      deleteOneCategory(id: $id)
    }
  `

  const vars = {
    id: ctx.cat1.id,
  } satisfies MutationDeleteOneCategoryArgs

  const data = await fetchQql<
    {
      deleteOneCategory: Mutation['deleteOneCategory']
    },
    MutationDeleteOneCategoryArgs
  >(ctx.user.headers, input.input, vars)

  expect(data.deleteOneCategory).toBe(true)

  const data2 = await fetchQql(ctx.user.headers, '{ getAllCategories { id } }')

  expect(data2.getAllCategories.length).toBe(2)
  expect(data2.getAllCategories[0].id).toBe(ctx.cat2.id)
  expect(data2.getAllCategories[1].id).toBe(ctx.cat3.id)
})

it('delete_many_categories', async () => {
  const input = gql`
    mutation delete_many_categories($ids: [ID!]!) {
      deleteManyCategories(ids: $ids)
    }
  `

  const vars = {
    ids: [ctx.cat2.id, ctx.cat3.id],
  } satisfies MutationDeleteManyCategoriesArgs

  const data = await fetchQql<
    {
      deleteManyCategories: Mutation['deleteManyCategories']
    },
    MutationDeleteManyCategoriesArgs
  >(ctx.user.headers, input.input, vars)

  expect(data.deleteManyCategories).toBe(2)

  const data2 = await fetchQql(ctx.user.headers, '{ getAllCategories { id } }')

  expect(data2.getAllCategories.length).toBe(0)
})

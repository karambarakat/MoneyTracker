import { rest } from 'msw'
import 'types/gql/graphql'
import {
  User,
  Category,
  CategoryFragment,
  Mutation,
  Query,
  UserFragmentDoc,
  UserFragment,
  Maybe,
  Entry,
  EntryFragment,
} from 'types/gql/graphql'

export const rejectGraphql = rest.all(
  'http://localhost:8080/graphql',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ data: 'rejectGraphql' }))
  },
)

type fromTypesToFragment<Input extends Record<string, unknown>> = {
  [k in keyof Input]?: Input[k] extends boolean | number
    ? Input[k]
    : Input[k] extends Category
    ? CategoryFragment
    : Input[k] extends Array<Category>
    ? Array<CategoryFragment>
    : Input[k] extends Entry
    ? EntryFragment
    : Input[k] extends Array<Entry>
    ? Array<EntryFragment>
    : Input[k] extends User
    ? UserFragment
    : never
}

export function GraphqlMsw<Res extends fromTypesToFragment<Query & Mutation>>(
  input: Res,
) {
  return rest.all('http://localhost:8080/graphql', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ data: input }),
      ctx.set('X-Token', 'anything'),
    )
  })
}
